import { HttpClient } from "../../../../../utils/http/HttpClient";

export class ImageService {
    constructor(signal) {
        this.httpClient = new HttpClient({
            baseURL: `https://localhost:7144/file`,
            signal,
        });
    }
    async getImageSnealker(sneakerId) {
        return await this.httpClient.get(`sneaker/${sneakerId}`);
    }
}
