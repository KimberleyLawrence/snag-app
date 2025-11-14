package main

import (
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"slices"
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
	RatingSpeed   int    `json:"rating_speed"`
}

type HighScore struct {
	GroupName     string  `json:"group_name"`
	GroupLocation string  `json:"group_location"`
	Rating        float64 `json:"rating"`
	Votes         int     `json:"votes"`
}

type App struct {
	db gorm.DB
}

func errAsJson(s string) string {
	return fmt.Sprintf(`{"error": "%s"}`, s)
}

func (a *App) apiNewVote(w http.ResponseWriter, r *http.Request) {
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
	log.Printf("vote: %+v\n", v)
	fmt.Fprintf(w, "%+v", v)
}

func (a *App) apiHighscores(w http.ResponseWriter, r *http.Request) {

	userLocaion := r.URL.Query().Get("location")
	if !slices.Contains(LocationNames, userLocaion) {
		errStr := fmt.Sprintf("Bad Request: unexpected location:%s -> %s", userLocaion, LocationNames)
		http.Error(w, errAsJson(errStr), http.StatusBadRequest)
		return
	}

	h := []HighScore{}
	a.db.Table("votes").Select("group_name", "group_location", "(avg(rating_snag) + avg(rating_onion) + avg(rating_speed))/3 as rating", "count() as votes").Where("group_location = ?", userLocaion).Group("group_name, group_location").Order("rating DESC, votes DESC").Limit(5).Scan(&h)

	b, err := json.Marshal(h)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, string(b))
}

func (a *App) apiGroups(w http.ResponseWriter, r *http.Request) {

	b, err := json.Marshal(GroupNames)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, string(b))
}

func (a *App) apiLocations(w http.ResponseWriter, r *http.Request) {

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

	for i := range 5 {

		v := Vote{
			GroupName:     GroupNames[rand.Intn(len(GroupNames))],
			GroupLocation: LocationNames[rand.Intn(len(LocationNames))],
			User:          fmt.Sprintf("test-%d", i),
			RatingSnag:    rand.Intn(6),
			RatingOnion:   rand.Intn(6),
			RatingSpeed:   rand.Intn(6),
		}
		app.db.Clauses(clause.OnConflict{DoNothing: true}).Create(&v)
		fmt.Println(v)
	}

	http.HandleFunc("/api/vote", app.apiNewVote)
	http.HandleFunc("/api/hightscores", app.apiHighscores)
	http.HandleFunc("/api/groups", app.apiGroups)
	http.HandleFunc("/api/locations", app.apiLocations)
	log.Println("listening on :8090")
	http.ListenAndServe(":8090", nil)

}
