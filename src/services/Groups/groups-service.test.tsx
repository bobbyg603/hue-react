import { GroupsService } from './groups-service';
import { getGroupById, getGroups, setName, setState } from './responses';

describe('GroupsService', () => {
    let fakeApiClient;
    let groupsService: GroupsService;

    beforeEach(() => {
        fakeApiClient = {};
        fakeApiClient['get'] = jest.fn();
        fakeApiClient['put'] = jest.fn();

        groupsService = new GroupsService(fakeApiClient);
    });

    describe('getGroupById', () => {
        beforeEach(() => fakeApiClient.get.mockReturnValue(Promise.resolve(getGroupById)));

        it('should call get with route \'/group/:id\'', async () => {
            const id = '123';

            await groupsService.getGroupById(id);

            expect(fakeApiClient.get).toHaveBeenLastCalledWith(`/groups/${id}`);
        });

        it('should return result of get mapped to group', async () => {
            const id = '123';

            const result = await groupsService.getGroupById(id);

            expect(result).toEqual({
                id: '123',
                name: 'Living Room',
                state: {
                    brightness: 234,
                    color: {
                        r: 255,
                        b: 127.49025004699553,
                        g: 204.5848581957951
                    },
                    on: true
                }
            });
        });
    });

    describe('getGroups', () => {
        beforeEach(() => fakeApiClient.get.mockReturnValue(Promise.resolve(getGroups)));

        it('should call get with route \'/groups\'', async () => {
            await groupsService.getGroups();

            expect(fakeApiClient.get).toHaveBeenCalledWith('/groups');
        });

        it('should return result of get mapped to array of groups', async () => {
            const expectedColors = [];
            expectedColors['1'] = {
                r: 255,
                g: 140.4982205328367,
                b: 31.95881344733815
            };
            expectedColors['2'] = {
                r: 255,
                b: 83.23742026299634,
                g: 171.63152569577457
            };
            expectedColors['3'] = {
                r: 255,
                b: 117.31245397859168,
                g: 200.04975180662478
            };

            const result = await groupsService.getGroups();

            result.forEach((result, i) => {
                const group = getGroups[result.id];
                expect(result.id).toEqual(Object.keys(getGroups)[i]);
                expect(result.name).toEqual(group.name);
                expect(result.state.on).toEqual(group.action.on);
                expect(result.state.brightness).toEqual(group.action.bri);
                expect(result.state.color).toEqual(expectedColors[result.id]);
            });
        });
    });

    describe('setName', () => {
        beforeEach(() => fakeApiClient.put.mockReturnValue(Promise.resolve(setName)));

        it('should call put with route \'/group/:id\' and new name', async () => {
            const id = '123';
            const name = 'Home Sweet Pineapple';

            await groupsService.setName(id, name);

            expect(fakeApiClient.put).toHaveBeenLastCalledWith(
                `/groups/${id}`,
                { name }
            );
        });
    });

    describe('setState', () => {
        beforeEach(() => fakeApiClient.put.mockReturnValue(Promise.resolve(setState)));

        it('should call put with route \'/group/:id/action\' and body containing rgb value converted to xy', async () => {
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

            await groupsService.setState(id, state);

            expect(fakeApiClient.put).toHaveBeenLastCalledWith(
                `/groups/${id}/action`,
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
