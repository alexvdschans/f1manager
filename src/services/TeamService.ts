import tData from "@/api/teams.json";

/* eslint-disable */
class TeamService {

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      const t = tData;
      resolve(tData);
    });
  }

}

export default new TeamService();