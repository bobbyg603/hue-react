import { ApiClient } from '../ApiClient/api-client-service';

export class ConfigService {
  constructor(private _apiClient: ApiClient) { }

  async getConfig(): Promise<Object> {
    return this._apiClient.get('/config');
  }
}
