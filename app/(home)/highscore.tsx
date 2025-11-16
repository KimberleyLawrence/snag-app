"use client"

import useSWR from 'swr'

export type HighscoreResponse = {
  highscores: HighScoreRecord[];
  location: string;
}

export type HighScoreRecord = {
    group_name: string;
    group_location: string;
    rating: number;
    votes: number;
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useHighscore ({ location }: {location: string}) {
  const url = `http://10.1.1.2:8090/api/hightscores?location=${location}`;
  const { data, error, isLoading }: {data: HighscoreResponse; error: any; isLoading: boolean} = useSWR(url, fetcher)
 
  return {
    highscoreResponse: data,
    isLoading,
    isError: error
  }
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

const NoVotes = () => {
  return (
    <>
      <p>no results</p>
    </>
  )
}

 
export function Highscore({ location }: {location: string}) {
  const { highscoreResponse, isLoading, isError } = useHighscore({location})
 
  return (
    <>
      {highscoreResponse 
        ? (highscoreResponse.highscores?.length === 0 ? <NoVotes /> : highscoreResponse.highscores?.map((group: HighScoreRecord, index: number ) => (
<Leader name={group.group_name} position={index+1} rating={group.rating} votes={group.votes} />
      )))
        : <div>Loading...</div>
    }
    </>
  );
}