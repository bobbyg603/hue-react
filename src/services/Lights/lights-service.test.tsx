import { LightsService } from "./lights-service";
import { getLightById, getLights, setName, setState } from './responses';

describe('LightsService', () => {
    let fakeApiClient;
    let lightsService: LightsService;

    beforeEach(() => {
        fakeApiClient = {};
        fakeApiClient['get'] = jest.fn();
        fakeApiClient['put'] = jest.fn();

        lightsService = new LightsService(fakeApiClient);
    });

    describe('getLightById', () => {
        beforeEach(() => fakeApiClient.get.mockReturnValue(Promise.resolve(getLightById)));

        it('should call get with route \'/lights/:id\'', async () => {
            const id = '123';

            await lightsService.getLightById(id);

            expect(fakeApiClient.get).toHaveBeenLastCalledWith(`/lights/${id}`);
        });

        it('should return result of get mapped to a Light', async () => {
            const id = '123';

            const result = await lightsService.getLightById(id);

            expect(result).toEqual({
                id: '123',
                name: 'Living Room Color 1',
                state: {
                    brightness: 254,
                    color: {
                        r: 255,
                        b: 128.62494971424502,
                        g: 204.98454831751815
                    },
                    on: true
                }
            });
        });
    });

    describe('getLights', () => {
        beforeEach(() => fakeApiClient.get.mockReturnValue(Promise.resolve(getLights)));

        it('should call get with route \'/lights\'', async () => {
            await lightsService.getLights();

            expect(fakeApiClient.get).toHaveBeenCalledWith('/lights');
        });

        it('should return result of get mapped to an array of Lights', async () => {
            const expectedColors = [];
            expectedColors['6'] = {
                r: 255,
                b: 31.95881344733815,
                g: 140.4982205328367
            }
            expectedColors['8'] = {
                r: 206.08115467078974,
                g: 178.45175876672016,
                b: 255
            }
            expectedColors['9'] = {
                r: 255,
                g: 200.04975180662478,
                b: 117.31245397859168
            };

            const result = await lightsService.getLights();

            result.forEach((result, i) => {
                const group = getLights[result.id];
                expect(result.id).toEqual(Object.keys(getLights)[i]);
                expect(result.name).toEqual(group.name);
                expect(result.state.on).toEqual(group.state.on);
                expect(result.state.brightness).toEqual(group.state.bri);
                expect(result.state.color).toEqual(expectedColors[result.id]);
            });
        });
    });

    describe('setName', () => {
        beforeEach(() => fakeApiClient.put.mockReturnValue(Promise.resolve(setName)));

        it('should call put with route \'/lights/:id\' and new name', async () => {
            const id = '123';
            const name = 'Home Sweet Pineapple Light 1';

            await lightsService.setName(id, name);

            expect(fakeApiClient.put).toHaveBeenLastCalledWith(
                `/lights/${id}`,
                { name }
            );
        });
    });

    describe('seteState', () => {
        beforeEach(() => fakeApiClient.put.mockReturnValue(Promise.resolve(setState)));

        it('should call put with route \'/lights/:id/state\' and body containing rgb color converted to xy', async () => {
            const id = '123';
            const state = {
                on: true,
                brightness: 254,
                color: {
                    r: 0,
                    g: 255,
                    b: 0
                }
            };

            await lightsService.setState(id, state);

            expect(fakeApiClient.put).toHaveBeenLastCalledWith(
                `/lights/${id}/state`,
                {
                    bri: 254,
                    on: true,
                    xy: [
                        0.11500021676131911,
                        0.8259995753701338,
                    ]
                }
            );
        });
    });
});
