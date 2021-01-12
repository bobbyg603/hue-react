import { ApiClient } from './api-client-service';

const host = '192.168.0.117';
const route = 'fake/route';
const username = 'username';

let apiClient;
let fakeReturnValue;

describe('get', () => {
    beforeEach(() => {
        fakeReturnValue = '❤️';
        jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => fakeReturnValue } as any);
    
        apiClient = new ApiClient(host, username);
    });
    
    test('should call fetch with correct url', async () => {
        const expectedRoute = `http://${host}/api/${username}/${route}`;
    
        await apiClient.get(route);
    
        expect(global.fetch).toHaveBeenCalledWith(expectedRoute);
    });
    
    test('should return result of get', async () => {
        const result = await apiClient.get(route);
    
        expect(result).toEqual(fakeReturnValue);
    });

    afterEach(() => (global.fetch as any).mockClear())
})
