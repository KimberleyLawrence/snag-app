
export type HighScoreRecord = {
    group_name: string;
    group_location: string;
    rating: number;
    votes: number;

}

export async function FetchHighScore(location: string): Promise<HighScoreRecord[]> {
  const data = await fetch(`http://localhost:8090/api/hightscores?location=${location}`)
  const records: Array<HighScoreRecord> = await data.json();
  console.log('Fetched data:', records);
  return records;
}