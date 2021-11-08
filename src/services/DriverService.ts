import http from "@/http-service";
import ResponseData from "@/types/ResponseData";

class DriverService {
  getAll(): Promise<ResponseData> {
    return http.get("/2021/drivers.json");
  }

  async get(id: number): Promise<ResponseData> {
    return await http.get(`/drivers/${id}.json`);
  }
}

export default new DriverService();
