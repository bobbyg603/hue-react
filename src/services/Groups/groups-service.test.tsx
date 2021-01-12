import { GroupsService } from './groups-service';
import { getGroups } from './responses';

let fakeApiClient;
let groupsService: GroupsService;

describe('getGroups', () => {
    beforeEach(() => {
        fakeApiClient = { };
        fakeApiClient['get'] = jest.fn();
        fakeApiClient.get.mockReturnValue(Promise.resolve(getGroups));
    
        groupsService = new GroupsService(fakeApiClient);
    });
    
    test('should call get with route \'/groups\'', async () => {    
        await groupsService.getGroups();
    
        expect(fakeApiClient.get).toHaveBeenCalledWith('/groups');
    });
    
    test('should return result of get mapped to array of groups', async () => {
        const result = await groupsService.getGroups();
    
        result.forEach((result, i) => {
            const group = getGroups[result.id];
            expect(result.id).toEqual(Object.keys(getGroups)[i]);
            expect(result.name).toEqual(group.name);
            expect(result.on).toEqual(group.action.on);
            expect(result.brightness).toEqual(group.action.bri);
            expect(result.x).toEqual(group.action.xy[0]);
            expect(result.y).toEqual(group.action.xy[1]);
        });
    });
})
