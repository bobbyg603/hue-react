import { LightsService } from "./lights-service";
import { getLights } from './responses';

let fakeApiClient;
let groupsService: LightsService;

describe('getLights', () => {
    beforeEach(() => {
        fakeApiClient = { };
        fakeApiClient['get'] = jest.fn();
        fakeApiClient.get.mockReturnValue(Promise.resolve(getLights));
    
        groupsService = new LightsService(fakeApiClient);
    });
    
    test('should call get with route \'/lights\'', async () => {    
        await groupsService.getLights();
    
        expect(fakeApiClient.get).toHaveBeenCalledWith('/lights');
    });
    
    test('should return result of get', async () => {
        const result = await groupsService.getLights();
    
        result.forEach((result, i) => {
            const group = getLights[result.id];
            expect(result.id).toEqual(Object.keys(getLights)[i]);
            expect(result.name).toEqual(group.name);
            expect(result.on).toEqual(group.state.on);
            expect(result.brightness).toEqual(group.state.bri);
            expect(result.x).toEqual(group.state.xy[0]);
            expect(result.y).toEqual(group.state.xy[1]);
        });
    });
})
