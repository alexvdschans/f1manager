import http from "@/http-service";
import ResponseData from "@/types/ResponseData";

class RaceService {
  getAll(): Promise<ResponseData> {
    return http.get("/2021.json");
  }

  get(round: number): Promise<ResponseData> {
    return http.get(`/2021/${round}.json`);
  }
}

export default new RaceService();
