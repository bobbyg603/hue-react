import React, { ChangeEvent } from 'react';
import { convertHexToRgb, convertRgbToHex } from '../../utils/color';
import './Bulb.scss';

export interface Light {
  id: string;
  name: string;
  state: LightState;
}

export interface LightState {
  on: boolean;
  brightness: number;
  color: LightColor;
}

export enum LightSize {
  small = 1,
  medium = 2,
  large = 4
}

export interface LightColor {
  r: number;
  g: number;
  b: number;
}

export interface BulbProps extends Light {
  size: LightSize;
  onNameChange: (name: string) => any;
  onStateChange: (state: LightState) => any;
}

const Bulb: React.FC<BulbProps> = (props: BulbProps) => {
  const { onNameChange, onStateChange } = props;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  const handleBrightnessChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const brightness = parseInt(e.target.value);
    onStateChange({
      ...props.state,
      brightness
    });
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = convertHexToRgb(e.target.value);
    onStateChange({
      ...props.state,
      color
    });
  };

  const handleOnOffChange = () => {
    const on = !props.state.on;
    onStateChange({
      ...props.state,
      on
    });
  };

  const { r, g, b } = props.state.color;
  const color = convertRgbToHex(r, g, b);
  const bulb = createBulb(props.state, props.size);

  return (
    <div className="Bulb" data-testid="Bulb">
      <div id="toggleOnOff" onClick={handleOnOffChange}>
        {bulb}
      </div>
      <form>
        <input className="mt-2 form-control" type="text" name="name" placeholder={props.name} onChange={handleNameChange}></input>
        <input className="mt-2 form-control" type="color" name="color" defaultValue={color} onChange={handleColorChange}></input>
        <input className="mt-2 p-0 form-control" type="range" min="0" max="254" name="brightness" defaultValue={props.state.brightness} onChange={handleBrightnessChange}></input>
      </form>
    </div>
  );
};

export default Bulb;

function createBulb(state: LightState, size: LightSize) {
  const scale = size ?? LightSize.medium;
  const color = state.on ? convertRgbToHex(state.color.r, state.color.g, state.color.b) : 'gray';

  const bulbWidth = 38 * scale;
  const bulbHeight = 47 * scale;
  const glowDiameter = bulbWidth;
  const baseMarginTop = bulbHeight - glowDiameter + 5;

  const bulbStyle = {
    width: `${bulbWidth}px`,
    height: `${bulbHeight}px`,
    fill: color,
  };

  const glowStyle = {
    background: color,
    boxShadow: state.on ? `0px 0px ${15 * scale}px ${2.5 * scale}px ${color}` : 'none',
    width: `${glowDiameter}px`,
    height: `${glowDiameter}px`,
    borderRadius: `${25 * scale}px`,
    marginTop: `-${bulbHeight}px`
  };

  const baseStyle = {
    width: `${16 * scale}px`,
    height: `${16.5 * scale}px`,
    marginTop: `${baseMarginTop}px`
  }

  return (
    <div className="bulb">
      <svg id="bulb" viewBox="0 0 76 94" style={bulbStyle}>
        <path d="M76,37.037 C76,59.939 55.6428571,75.427 55.6428571,93.5 L20.3571429,93.5 C20.3571429,75.427 0,59.9335 0,37.037 C0,13.1505 18.9891429,0 37.9782857,0 C56.9891429,0 76,13.167 76,37.037 L76,37.037 Z"></path>
      </svg>
      <div id="glow" style={glowStyle}></div>
      <svg id="base" viewBox="0 0 32 33" style={baseStyle}>
        <path d="M29.3333333,0 L2.66666667,0 C1.19466667,0 0,1.232 0,2.75 C0,4.268 1.19466667,5.5 2.66666667,5.5 L29.3333333,5.5 C30.8053333,5.5 32,4.268 32,2.75 C32,1.232 30.8053333,0 29.3333333,0 L29.3333333,0 Z M29.3333333,11 L2.66666667,11 C1.19466667,11 0,12.232 0,13.75 C0,15.268 1.19466667,16.5 2.66666667,16.5 L29.3333333,16.5 C30.8053333,16.5 32,15.268 32,13.75 C32,12.232 30.8053333,11 29.3333333,11 L29.3333333,11 Z M30.6666667,22 L1.33333333,22 L9.072,31.1245 C10.0853333,32.3125 11.552,33 13.088,33 L18.9173333,33 C20.4533333,33 21.9146667,32.3125 22.928,31.1245 L30.6666667,22 L30.6666667,22 Z"></path>
      </svg>
    </div>
  );
}