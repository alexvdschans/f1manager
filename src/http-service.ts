import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://ergast.com/api/f1",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
