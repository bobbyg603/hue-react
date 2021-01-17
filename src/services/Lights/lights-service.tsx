import { ApiClient } from "../ApiClient/api-client-service";
import { Color, RouteableBulb as Light } from '../../components/Bulb/Bulb';
import ColorConverter from 'cie-rgb-color-converter';

export class LightsService {
  constructor(private _apiClient: ApiClient) { }

  async getLightById(id: string): Promise<Light> {
    return this._apiClient.get(`/lights/${id}`)
      .then((response: GetLightResponse) => {
        const name = response.name;
        const on = response.state.on;
        const x = response.state.xy[0];
        const y = response.state.xy[1];
        const brightness = response.state.bri;
        const color = ColorConverter.xyBriToRgb(x, y, brightness);
        return {
          id,
          name,
          on,
          color,
          brightness
        } as Light;
      });
  }

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
          const color = ColorConverter.xyBriToRgb(x, y, brightness);
          return {
            id,
            name,
            on,
            brightness,
            color
          } as Light;
        });
      });
  }

  async setName(id: string, name: string): Promise<any> {
    return this._apiClient.put(`/lights/${id}`, {
      name
    });
  }

  async setOnOffValue(id: string, on: boolean): Promise<any> {
    return this._apiClient.put(`/lights/${id}/state`, {
      on
    });
  }

  async setBrightness(id: string, brightness: number): Promise<any> {
    const bri = brightness;
    return this._apiClient.put(`/lights/${id}/state`, {
      bri
    });
  }

  async setColor(id: string, color: Color): Promise<any> {
    const { x, y } = ColorConverter.rgbToXy(color.r, color.g, color.b);
    return this._apiClient.put(`/lights/${id}/state`, {
      xy: [x,y]
    });
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