import { ApiClient } from './api-client-service';

const host = '192.168.0.117';
const route = 'fake/route';
const username = 'username';

let apiClient: ApiClient;
let fakeReturnValue;

describe('ApiClient', () => {
    beforeEach(() => {
        fakeReturnValue = '❤️';
        jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => fakeReturnValue } as any);
    
        apiClient = new ApiClient(host, username);
    });

    afterEach(() => (global.fetch as any).mockClear());

    describe('get', () => {    
        it('should call fetch with correct url', async () => {
            const expectedRoute = `http://${host}/api/${username}/${route}`;
        
            await apiClient.get(route);
        
            expect(global.fetch).toHaveBeenCalledWith(expectedRoute);
        });
        
        it('should return result of get', async () => {
            const result = await apiClient.get(route);
        
            expect(result).toEqual(fakeReturnValue);
        });
    });

    describe('put', () => {
        it('should call fetch with correct url, body containing method \'PUT\' and stringified data', async () => {
            const expectedRoute = `http://${host}/api/${username}/${route}`;
            const body = { data: '💡' };

            await apiClient.put(route, body);

            expect(global.fetch).toHaveBeenCalledWith(
                expectedRoute,
                expect.objectContaining({
                    method: 'PUT',
                    body: JSON.stringify(body)
                })
            );
        });

        it('should return result of put', async () => {
            const body = { data: '💡' };

            const result = await apiClient.put(route, body);
        
            expect(result).toEqual(fakeReturnValue);
        });
    });
});
