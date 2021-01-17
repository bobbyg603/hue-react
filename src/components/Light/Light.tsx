import hexRgb from 'hex-rgb';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import rgbHex from 'rgb-hex';
import { LightsService } from '../../services/Lights/lights-service';
import Bulb, { Size, RouteableBulb } from '../Bulb/Bulb';
import './Light.css';

export interface LightProps {
  id: string | null;
  lightsService: LightsService;
}

const initialLight = {
  id: '',
  name: '',
  on: false,
  brightness: 0,
  color: {
    r: 0,
    g: 0,
    b: 0
  }
} as RouteableBulb;

const Light: React.FC<LightProps> = (props: LightProps) => {

  const [light, setLight] = useState(initialLight);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!props.id) {
      return;
    }

    props.lightsService.getLightById(props.id as string)
      .then((bulb: RouteableBulb) => setLight(bulb));
  }, [props.id, props.lightsService, refresh]);

  if (!props.id) {
    return (<div className="Error" data-testid="Error">
      Must provide 'id' query param
    </div>
    );
  }

  const handleNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // TODO BG debounce
    const name = e.target.value;
    await props.lightsService.setName(props.id as string, name);
    setRefresh(refresh + 1);
  };

  const handleColorChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // TODO BG debounce
    const { red, green, blue } = hexRgb(e.target.value);
    const color = { r: red, g: green, b: blue };
    await props.lightsService.setColor(props.id as string, color);
    setRefresh(refresh + 1);
  };

  const handleBrightnessChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // TODO BG debounce
    const brightness = parseInt(e.target.value);
    await props.lightsService.setBrightness(props.id as string, brightness);
    setRefresh(refresh + 1);
  };

  const { r, g, b } = light.color;
  const hex = rgbHex(r, g, b);
  const color = `#${hex}`;

  return (
    <div className="Light" data-testid="Light">
      <Row className="mx-0">
        <Col className="mt-4 text-center" lg="2">
          <h5>
            {light.name}
          </h5>
          <Bulb
            on={light.on}
            brightness={light.brightness}
            color={light.color}
            size={Size.large}>
          </Bulb>
          <form>
            <input className="mt-2 form-control" type="text" name="name" placeholder={light.name} onChange={handleNameChange}></input>
            <input className="mt-2 form-control" type="color" name="color" value={color} onChange={handleColorChange}></input>
            <input className="mt-2 p-0 form-control" type="range" min="0" max="254" value={light.brightness} onChange={handleBrightnessChange}></input>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default Light;
