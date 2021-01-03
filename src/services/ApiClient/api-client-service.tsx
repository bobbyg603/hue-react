import * as urlJoin from 'url-join';

export class ApiClient {
    constructor(
        private _fetch: any,
        private _host: string,
        private _username: string
    ) { }

    async get(route: string): Promise<any> {
        const url = this.getUrl(route);
        const response = await this._fetch(url);
        return response.json();
    }

    private getUrl(route: string): string {
        return urlJoin(`http://${this._host}`, 'api', this._username, route);
    }
}