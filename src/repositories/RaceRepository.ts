import RaceService from "@/services/RaceService";
import { RaceTrack } from "@/types/RaceTrack";
import RaceWeekend from "@/types/RaceWeekend";
import ResponseData from "@/types/ResponseData";

class RaceRepository {
  getAll(): RaceWeekend[] {
    const seasonSchedule: RaceWeekend[] = [] as RaceWeekend[];

    RaceService.getAll()
      .then((response: ResponseData) => {
        const data = response.data.MRData.RaceTable.Races;

        data.forEach((element: any) => {
          const raceTrack: RaceTrack = {
            name: element.raceName,
          };

          const raceWeekend: RaceWeekend = {
            round: element.round,
            date: element.date,
            track: raceTrack,
          };

          seasonSchedule.push(raceWeekend);
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(seasonSchedule);
    return seasonSchedule;
  }
}
export default new RaceRepository();
