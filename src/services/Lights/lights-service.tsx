import { Light, LightState } from '../../components/Bulb/Bulb';
import { ApiClient } from '../ApiClient/api-client-service';
import { convertRgbToXy, convertXyBriToRgb } from '../Color/color-service';

export class LightsService {
  constructor(private _apiClient: ApiClient) { }

  async getLightById(id: string): Promise<Light> {
    return this._apiClient.get(`/lights/${id}`)
      .then((response: GetLightResponse) => {
        return this.createLightFromLightResponse(id, response);
      });
  }

  async getLights(): Promise<Array<Light>> {
    return this._apiClient.get('/lights')
      .then((response: GetLightsResponse) => {
        return Object.keys(response).map(key => {
          return this.createLightFromLightResponse(key, response[key]);
        });
      });
  }

  async setName(id: string, name: string): Promise<any> {
    return this._apiClient.put(`/lights/${id}`, {
      name
    });
  }
  
  async setState(id: string, state: LightState): Promise<any> {
    const on = state.on;
    const bri = state.brightness;
    const { x, y } = convertRgbToXy(state.color.r, state.color.g, state.color.b);
    const xy = [x, y];
    return this._apiClient.put(`/lights/${id}/state`, {
      on,
      bri,
      xy
    });
  }

  private createLightFromLightResponse(id: string, response: GetLightResponse): Light {
    const name = response.name;
    const on = response.state.on;
    const x = response.state.xy[0];
    const y = response.state.xy[1];
    const brightness = response.state.bri;
    const color = convertXyBriToRgb(x, y, brightness);
    const state = {
      on,
      color,
      brightness
    };
    return {
      id,
      name,
      state
    } as Light;
  }
}

interface GetLightsResponse {
  [id: string]: GetLightResponse;
}

interface GetLightResponse {
  state: State;
  swupdate: { state: string, lastinstall: string };
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: {
    certified: boolean;
    control: {
      mindimlevel: number;
      maxlumen: number;
      colorgamuttype: string;
      colorgamut: Array<Array<number>>;
      ct: { min: number, max: number };
    };
    streaming: {
      renderer: boolean;
      proxy: boolean;
    };
  };
  config: {
    archetype: string;
    function: string;
    direction: string;
    startup: {
      mode: string;
      configured: boolean;
    }
  };
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
}

interface State {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: Array<number>;
  ct: number;
  alert: string;
  colormode: string;
  mode: string;
  reachable: boolean;
}