import { GroupsService } from './groups-service';

let fakeApiClient;
let fakeReturnValue;
let groupsService: GroupsService;

describe('getGroups', () => {
    beforeEach(() => {
        fakeReturnValue = '❤️';
        fakeApiClient = { };
        fakeApiClient['get'] = jest.fn();
        fakeApiClient.get.mockReturnValue(Promise.resolve(fakeReturnValue));
    
        groupsService = new GroupsService(fakeApiClient);
    });
    
    test('should call get with route \'/groups\'', async () => {    
        await groupsService.getGroups();
    
        expect(fakeApiClient.get).toHaveBeenCalledWith('/groups');
    });
    
    test('should return result of get', async () => {
        const result = await groupsService.getGroups();
    
        expect(result).toEqual(fakeReturnValue);
    });
})
