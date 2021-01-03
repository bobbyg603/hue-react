import { ApiClient } from "../ApiClient/api-client-service";

export class GroupsService {
  constructor(private _apiClient: ApiClient) { }

  async getGroups(): Promise<any> {
    return this._apiClient.get('/groups');
  }
}