import urlJoin from 'url-join';

export class ApiClient {
    constructor(
        private _host: string,
        private _username: string
    ) { }

    async get(route: string): Promise<any> {
        const url = this.getUrl(route);
        const response = await fetch(url);
        return response.json();
    }

    async put(route: string, body: Object): Promise<any> {
        const url = this.getUrl(route);
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
        return response.json();
    }

    private getUrl(route: string): string {
        return urlJoin(`http://${this._host}`, 'api', this._username, route);
    }
}