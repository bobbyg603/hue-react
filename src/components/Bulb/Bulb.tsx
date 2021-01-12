import './Bulb.scss';

export interface BulbProps {
  on: boolean;
  x: number;
  y: number;
  brightness: number;
}

const Bulb: React.FC<BulbProps> = (props: BulbProps) => {

  const { r, g, b } = xyBriToRgb(props.x, props.y, props.brightness);
  const color = `rgb(${r}, ${g}, ${b})`;

  const fill = props.on ? color : 'gray';
  const bulb = (
    <svg width="76px" height="94px" viewBox="0 0 76 94" id="bulb" style={{ fill }}>
      <path
        d="M76,37.037 C76,59.939 55.6428571,75.427 55.6428571,93.5 L20.3571429,93.5 C20.3571429,75.427 0,59.9335 0,37.037 C0,13.1505 18.9891429,0 37.9782857,0 C56.9891429,0 76,13.167 76,37.037 L76,37.037 Z"
      ></path>
    </svg>
  );

  const background = color;
  const boxShadow = `0px 0px 30px 5px ${color}`;
  const glow = props.on ? <div id="glow" style={{ background, boxShadow }}></div> : '';

  const base = (
    <svg width="32px" height="33px" viewBox="0 0 32 33" id="base">
      <path
        d="M29.3333333,0 L2.66666667,0 C1.19466667,0 0,1.232 0,2.75 C0,4.268 1.19466667,5.5 2.66666667,5.5 L29.3333333,5.5 C30.8053333,5.5 32,4.268 32,2.75 C32,1.232 30.8053333,0 29.3333333,0 L29.3333333,0 Z M29.3333333,11 L2.66666667,11 C1.19466667,11 0,12.232 0,13.75 C0,15.268 1.19466667,16.5 2.66666667,16.5 L29.3333333,16.5 C30.8053333,16.5 32,15.268 32,13.75 C32,12.232 30.8053333,11 29.3333333,11 L29.3333333,11 Z M30.6666667,22 L1.33333333,22 L9.072,31.1245 C10.0853333,32.3125 11.552,33 13.088,33 L18.9173333,33 C20.4533333,33 21.9146667,32.3125 22.928,31.1245 L30.6666667,22 L30.6666667,22 Z"
      ></path>
    </svg>
  );

  return (
    <div className="Bulb" data-testid="Bulb">
      { bulb }
      { glow }
      { base }
    </div>
  )
};

export default Bulb;

// Convert xy to rgb https://stackoverflow.com/questions/22894498/philips-hue-convert-xy-from-api-to-hex-or-rgb
function xyBriToRgb(x, y, bri) {
  const z = 1.0 - x - y;
  const Y = bri / 255.0;
  const X = (Y / y) * x;
  const Z = (Y / y) * z;
  let r = X * 1.612 - Y * 0.203 - Z * 0.302;
  let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
  let b = X * 0.026 - Y * 0.072 + Z * 0.962;
  r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
  g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
  b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
  const maxValue = Math.max(r, g, b);
  r /= maxValue;
  g /= maxValue;
  b /= maxValue;
  r = r * 255; if (r < 0) { r = 255 };
  g = g * 255; if (g < 0) { g = 255 };
  b = b * 255; if (b < 0) { b = 255 };
  return {
    r,
    g,
    b
  };
}