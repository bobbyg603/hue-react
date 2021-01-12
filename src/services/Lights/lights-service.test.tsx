import { LightsService } from "./lights-service";

let fakeApiClient;
let fakeReturnValue;
let groupsService: LightsService;

describe('getLights', () => {
    beforeEach(() => {
        fakeReturnValue = '❤️';
        fakeApiClient = { };
        fakeApiClient['get'] = jest.fn();
        fakeApiClient.get.mockReturnValue(Promise.resolve(fakeReturnValue));
    
        groupsService = new LightsService(fakeApiClient);
    });
    
    test('should call get with route \'/lights\'', async () => {    
        await groupsService.getLights();
    
        expect(fakeApiClient.get).toHaveBeenCalledWith('/lights');
    });
    
    test('should return result of get', async () => {
        const result = await groupsService.getLights();
    
        expect(result).toEqual(fakeReturnValue);
    });
})
