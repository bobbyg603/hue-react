import { LightColor } from '../components/Bulb/Bulb';
import rgbHex from 'rgb-hex';
import hexRgb from 'hex-rgb';
import ColorConverter from 'cie-rgb-color-converter';

// https://stackoverflow.com/questions/22894498/philips-hue-convert-xy-from-api-to-hex-or-rgb
export function convertXyBriToRgb(x: number, y: number, bri: number): LightColor {
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
    r = r * 255; if (r < 0) { r = 0 };
    g = g * 255; if (g < 0) { g = 0 };
    b = b * 255; if (b < 0) { b = 0 };

    return {
        r,
        g,
        b
    } as LightColor;
}

export function convertRgbToHex(r: number, g: number, b: number): string {
    return `#${rgbHex(r, g, b)}`;
}

export function convertRgbaToCssString(r: number, g: number, b: number, a: number): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function convertHexToRgb(hex: string): LightColor {
    const { red, green, blue } = hexRgb(hex);
    const color = { r: red, g: green, b: blue };
    return color;
}

export function convertRgbToXy(r: number, g: number, b: number): { x: number, y: number} {
    return ColorConverter.rgbToXy(r, g, b);
}