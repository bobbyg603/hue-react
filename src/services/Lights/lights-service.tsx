import { ApiClient } from "../ApiClient/api-client-service";
import { RouteableBulb as Light } from '../../components/Bulb/Bulb';

export class LightsService {
  constructor(private _apiClient: ApiClient) { }

  async getLights(): Promise<Array<Light>> {
    return this._apiClient.get('/lights')
      .then((response: GetLightsResponse) => {
        return Object.keys(response).map(key => {
          const id = key;
          const group = response[id];
          const name = group.name;
          const on = group.state.on;
          const xy = group.state.xy;
          const x = xy ? xy[0] : 0;
          const y = xy ? xy[1] : 0;
          const brightness = group.state.bri;
          return {
            id,
            name,
            on,
            x,
            y,
            brightness
          } as Light;
        });
      });
  }

  async setOnOffValue(id: string, on: boolean): Promise<any> {
    return this._apiClient.put(`/lights/${id}/state`, {
      on
    });
  }
}


interface GetLightsResponse {
  [id: string]: LightResponse;
}

interface LightResponse {
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