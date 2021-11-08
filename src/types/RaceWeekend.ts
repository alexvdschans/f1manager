import { RaceTrack } from "./RaceTrack";

export default interface RaceWeekend {
  date: string;
  round: number;
  track: RaceTrack;
}
