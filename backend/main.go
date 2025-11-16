package main

import (
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"slices"
	"strings"
	"time"

	"gorm.io/driver/sqlite" // Sqlite driver based on CGO
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

var (
	GroupNames = []string{
		"sport_cricket",
		"sport_football",
		"sport_netball",
		"mens_shed",
		"primary_school",
	}
	LocationNames = []string{
		"vic",
		"nsw",
		"nt",
		"qld",
		"sa",
		"act",
		"wa",
		"tas",
		"nz",
	}
)

type Vote struct {
	gorm.Model
	GroupName     string `json:"group_name"`
	GroupLocation string `json:"group_location"`
	User          string `json:"user"`
	Date          string `json:"date"`
	RatingSnag    int    `json:"rating_snag"`
	RatingOnion   int    `json:"rating_onion"`
	RatingBread   int    `json:"rating_bread"`
	OnionsTop     bool   `json:"onions_top"`
}

type HighScore struct {
	GroupName     string  `json:"group_name"`
	GroupLocation string  `json:"group_location"`
	OnionsTop     int     `json:"onions_top"`
	OnionsBottom  int     `json:"onions_bottom"`
	Rating        float64 `json:"rating"`
	Votes         int     `json:"votes"`
}

type HighScoreResponse struct {
	HighScore []HighScore `json:"highscores"`
	Location  string      `json:"location"`
}

type App struct {
	db gorm.DB
}

var stateMap = map[string]string{
	"203.15.0.0/16":    "nsw",
	"220.238.160.0/19": "nsw",
	"154.152.0.0/16":   "vic",
	"61.96.192.0/18":   "vic",
	"120.136.0.0/16":   "qld",
	"203.83.240.0/20":  "qld",
	"139.216.0.0/19":   "sa",
	"150.232.192.0/18": "sa",
	"155.196.0.0/18":   "wa",
	"103.3.192.0/19":   "act",
	"122.3.0.0/16":     "nt",  // Added NT
	"153.100.0.0/15":   "tas", // Added TAS
}

func getState(ip string) (string, error) {
	ipAddr := net.ParseIP(ip)
	if ipAddr == nil {
		return "", fmt.Errorf("invalid IP address: %s", ip)
	}

	for cidr, state := range stateMap {
		_, cidrRange, err := net.ParseCIDR(cidr)
		if err != nil {
			return "", err
		}
		if cidrRange.Contains(ipAddr) {
			fmt.Printf("%s -> %s\n", ipAddr, state)
			return state, nil
		}
	}

	return "", fmt.Errorf("unknown IP address: %s", ip)
}

func errAsJson(s string) string {
	return fmt.Sprintf(`{"error": "%s"}`, s)
}

func enableCors(w http.ResponseWriter, r *http.Request) error {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.WriteHeader(http.StatusNoContent)
		return fmt.Errorf("http.StatusNoContent")
	}
	return nil
}

func (a *App) apiNewVote(w http.ResponseWriter, r *http.Request) {
	if enableCors(w, r) != nil {
		return
	}
	log.Println("apiNewVote")

	var v Vote
	err := json.NewDecoder(r.Body).Decode(&v)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		fmt.Fprintf(w, errAsJson("Bad Request: %+v"), r.Body)
		return
	}

	if !slices.Contains(GroupNames, v.GroupName) {
		errStr := fmt.Sprintf("Bad Request: unexpected group-name:%s -> %s", v.GroupName, GroupNames)
		http.Error(w, errAsJson(errStr), http.StatusBadRequest)
		return
	}

	if !slices.Contains(LocationNames, v.GroupLocation) {
		errStr := fmt.Sprintf("Bad Request: unexpected group-location:%s -> %s", v.GroupName, LocationNames)
		http.Error(w, errAsJson(errStr), http.StatusBadRequest)
		return
	}

	// unique User
	data := []byte(r.RemoteAddr)
	hash := sha1.New()
	hash.Write(data)
	hashedData := hash.Sum(nil)
	v.User = hex.EncodeToString(hashedData)

	v.Date = time.Now().Format("2006-1-2")
	a.db.Clauses(clause.OnConflict{DoNothing: true}).Create(&v)

	b, err := json.Marshal(v)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, `{"status": "success"}`)
	log.Printf("vote: %s", string(b))
}

func (a *App) apiHighscores(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	log.Printf("apiHighscores: %+v\n", r)
	userLocaion := r.URL.Query().Get("location")

	if userLocaion == "" {
		addrParts := strings.Split(r.RemoteAddr, ":")
		userLocaion, _ = getState(addrParts[0])
	}

	if !slices.Contains(LocationNames, userLocaion) {
		errStr := fmt.Sprintf("Bad Request: unexpected location:%s -> %s", userLocaion, LocationNames)
		http.Error(w, errAsJson(errStr), http.StatusBadRequest)
		return
	}

	h := []HighScore{}
	a.db.Table("votes").Select(
		"group_name",
		"group_location",
		"(avg(rating_snag) + avg(rating_onion) + avg(rating_bread))/3 as rating",
		"count() as votes",
	).Where("group_location = ?", userLocaion).Group("group_name, group_location").Order("rating DESC, votes DESC").Limit(5).Scan(&h)

	resp := HighScoreResponse{
		HighScore: h,
		Location:  userLocaion,
	}
	b, err := json.Marshal(resp)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, string(b))
}

func (a *App) apiGroups(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	b, err := json.Marshal(GroupNames)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, string(b))
}

func (a *App) apiLocations(w http.ResponseWriter, r *http.Request) {
	enableCors(w, r)
	b, err := json.Marshal(LocationNames)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, string(b))
}

func setupDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	// Perform database migration
	err = db.AutoMigrate(&Vote{})
	if err != nil {
		log.Fatal(err)
	}
	return db

}

func main() {

	app := &App{
		db: *setupDB(),
	}

	/*
		for i := range 500 {

			v := Vote{
				GroupName:     GroupNames[rand.Intn(len(GroupNames))],
				GroupLocation: LocationNames[rand.Intn(len(LocationNames))],
				User:          fmt.Sprintf("test-%d", i),
				RatingSnag:    rand.Intn(6),
				RatingOnion:   rand.Intn(6),
				RatingBread:   rand.Intn(6),
				OnionsTop:     bool(rand.Intn(2) == 1),
			}
			app.db.Clauses(clause.OnConflict{DoNothing: true}).Create(&v)
			fmt.Println(v)
		}
	*/

	http.HandleFunc("/api/vote", app.apiNewVote)
	http.HandleFunc("/api/hightscores", app.apiHighscores)
	http.HandleFunc("/api/groups", app.apiGroups)
	http.HandleFunc("/api/locations", app.apiLocations)
	log.Println("listening on :8090")
	http.ListenAndServe(":8090", nil)

}
