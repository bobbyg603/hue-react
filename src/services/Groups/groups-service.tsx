import { ApiClient } from "../ApiClient/api-client-service";
import { Light as Group, LightState } from '../../components/Bulb/Bulb';
import { convertRgbToXy, convertXyBriToRgb } from "../Color/color-service";

export class GroupsService {
  constructor(private _apiClient: ApiClient) { }

  async getGroups(): Promise<Array<Group>> {
    return this._apiClient.get('/groups')
      .then((response: GetGroupsResponse) => {
        return Object.keys(response).map(key => {
          return this.createGroupFromGroupResponse(key, response[key]);
        });
      });
  }

  async getGroupById(id: string): Promise<Group> {
    return this._apiClient.get(`/groups/${id}`)
      .then((response: GroupResponse) => {
          return this.createGroupFromGroupResponse(id, response);
      });
  }

  async setName(id: string, name: string): Promise<any> {
    return this._apiClient.put(`/groups/${id}`, {
      name
    });
  }

  async setState(id: string, state: LightState): Promise<any> {
    const on = state.on;
    const bri = state.brightness;
    const { x, y } = convertRgbToXy(state.color.r, state.color.g, state.color.b);
    const xy = [x, y];
    return this._apiClient.put(`/groups/${id}/action`, {
      on,
      bri,
      xy
    });
  }

  private createGroupFromGroupResponse(id: string, response: GroupResponse): Group {
    const name = response.name;
    const on = response.action.on;
    const xy = response.action.xy;
    const x = xy ? xy[0] : 0;
    const y = xy ? xy[1] : 0;
    const brightness = response.action.bri;
    const color = convertXyBriToRgb(x, y, brightness);
    // const color = ColorConverter.xyBriToRgb(x, y, brightness);
    const state = {
      on,
      brightness,
      color
    };
    return {
      id,
      name,
      state
    } as Group;
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
