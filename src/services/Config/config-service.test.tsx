
import { ConfigService } from './config-service';
import { getConfig } from './responses';

describe('ConfigService', () => {
    let fakeApiClient;
    let configService: ConfigService;

    beforeEach(() => {
        fakeApiClient = {};
        fakeApiClient['get'] = jest.fn();
        fakeApiClient.get.mockReturnValue(Promise.resolve(getConfig));

        configService = new ConfigService(fakeApiClient);
    });

    describe('getConfig', () => {
        it('should call api client with \'/config\'', async () => {
            await configService.getConfig();

            expect(fakeApiClient.get).toHaveBeenCalledWith('/config');
        });

        it('should return result from api client', async () => {
            const result = await configService.getConfig();

            expect(result).toEqual(getConfig);
        });
    });
});