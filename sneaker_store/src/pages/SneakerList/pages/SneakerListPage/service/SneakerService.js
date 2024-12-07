import { HttpClient } from "../../../../../utils/http/HttpClient";

export class SneakerService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: `https://localhost:7144/sneaker`,
      timeout: 10000,
      signal,
    });
  }
  async getAllSneakers() {
    return await this.httpClient.get("/list");
  }
  async getSneakerById(id) {
    return await this.httpClient.get(`/${id}`);
  }
  async createSneaker(sneaker) {
    return await this.httpClient.post("/create", sneaker);
  }
  async updateSneaker(sneaker) {
    return await this.httpClient.put("/update", sneaker);
  }
  async deleteSneaker(id) {
    return await this.httpClient.delete(`/delete/${id}`);
  }
}
