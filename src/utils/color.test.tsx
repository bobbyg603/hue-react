import { convertXyBriToRgb } from './color';

describe('convertXyBriToRgb', () => {
    it('should return value with r, g and b values', () => {
        const x = 0.5;
        const y = 0.5;
        const bri = 255;

        const result = convertXyBriToRgb(x, y, bri);

        expect(result).toEqual(
            expect.objectContaining({
                r: 255,
                g: 209.80869209875897,
                b: 0
            })
        );
    });
});