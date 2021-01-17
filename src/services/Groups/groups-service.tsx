import { RouteableBulb as Group } from "../../components/Bulb/Bulb";
import { ApiClient } from "../ApiClient/api-client-service";
import ColorConverter from 'cie-rgb-color-converter';

export class GroupsService {
  constructor(private _apiClient: ApiClient) { }

  async getGroups(): Promise<Array<Group>> {
    return this._apiClient.get('/groups')
      .then((response: GetGroupsResponse) => {
        return Object.keys(response).map(key => {
          const id = key;
          const group = response[id];
          const name = group.name;
          const on = group.action.on;
          const xy = group.action.xy;
          const x = xy ? xy[0] : 0;
          const y = xy ? xy[1] : 0;
          const brightness = group.action.bri;
          const color = ColorConverter.xyBriToRgb(x, y, brightness);
          return {
            id,
            name,
            on,
            brightness,
            color
          } as Group;
        });
      });
  }

  async setOnOffValue(id: string, on: boolean): Promise<any> {
    return this._apiClient.put(`/groups/${id}/action`, {
      on
    });
  }
}

interface GetGroupsResponse {
  [id: string]: GroupResponse;
}

interface GroupResponse {
  name: string;
  lights: Array<string>;
  sensors: Array<any>;
  type: string;
  state: { all_on: boolean, any_on: boolean };
  recycle: boolean;
  class: string;
  action: Action;
}

interface Action {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: Array<number>;
  ct: number;
  alert: string;
  colormode: string;
}