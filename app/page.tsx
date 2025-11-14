import type { Metadata } from "next";

import Link from "next/link";
import { FetchHighScore, HighScoreRecord } from "./components/highscore";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export const metadata: Metadata = {
  title: "Snag App",
  description: "Snags",
};

const LocationLink = ({ name }: { name: string }) => {
  return (
    <>
      <button
        type="button"
        className=" p-2  text-lg font-bold text-gray-900 rounded-s-lg"
      >
        {name}
      </button>
    </>
  );
};

const BlackBoard = ({ children }: { children: any }) => {
  return (
    <>
      <div
        className="bg-black-100 text-4xl  p-5 text-center uppercase font-stretch-ultra-condensed"
        style={{
          fontFamily: "mogra",
        }}
      >
        {children}
      </div>
    </>
  );
};

const Leaderboard = ({
  location,
  children,
}: {
  location: string;
  children: any;
}) => {
  return (
    <>
      <span>{location} Leaderboard</span>
      <div className="grid">{children}</div>
    </>
  );
};


const LeaderUI = async ({location} :{location:string}) => { 
  const locationScores = await FetchHighScore(location);
  return (
    <>
      {locationScores.map((group: HighScoreRecord, index: number ) => (
        <Leader position={index+1} name={group.group_name} rating={group.rating} votes={group.votes} />
      ))}
      </>
  )
}

const Leader = ({
  name,
  position,
  rating,
  votes,
}: {
  name: string;
  position: number;
  rating: number;
  votes: number;
}) => {
  /* Convert 1 into st, etc */
  let lastDigit: number = position % 10;
  var positionSuffix = "??";
  switch (lastDigit) {
    case 1:
      positionSuffix = "st";
      break;
    case 2:
      positionSuffix = "nd";
      break;
    case 3:
      positionSuffix = "rd";
      break;
    default:
      positionSuffix = "th";
  }

  return (
    <>
      <div className="col-1 m-5 grid">
        <span>
          {position}
          {positionSuffix} {name}
        </span>
        <span className="text-xl">
          rating({rating.toFixed(1)}) votes({votes})
        </span>
      </div>
    </>
  );
};



const ImageHeroLogo = "/images/sausage_logo_art.png";



export default function Page() {

  const locationName = "vic";
  const highscoreListings = LeaderUI({location: locationName});

  return (
    <>
      <Header>
        <h2 className="  text-xl font-bold text-center  p-3 -mb-3">
            WHO MAKES THE BEST HARDWARE STORE SNAGS?
        </h2>
        <div className="text-center ">
          <div className="">
            <LocationLink name="VIC" />
            <LocationLink name="NSW/ACT" />
            <LocationLink name="QLD" />
            <LocationLink name="SA" />
            <LocationLink name="WA" />
            <LocationLink name="TAS" />
            <LocationLink name="NT" />
            <LocationLink name="NZ" />
          </div>
        </div>
      </Header>

      <BlackBoard>        
        <Leaderboard location={locationName}>
          {highscoreListings}
        </Leaderboard>
        <div className="w-full p-4 sm:p-6">
          <div className="grid  ">
            <p className="  text-2xl font-bold text-center">
              {locationName} LIKES THEIR ONIONS</p>
            <p className="  text-2xl font-bold text-center">
              BELOW
            </p>
          </div>
        </div>
      </BlackBoard>

      <Footer>
          <h2 className="  text-3xl font-bold m-3 text-center">
            <Link href="/vote">VOTE NOW</Link>
          </h2>
      </Footer>

    </>
  );
}
