import { ApiClient } from "../ApiClient/api-client-service";

export class LightsService {
  constructor(private _apiClient: ApiClient) { }

  async getLights(): Promise<any> {
    return this._apiClient.get('/lights');
  }
}