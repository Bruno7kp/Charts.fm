import axios from 'axios';

export default class LastFm {
    private key: string;
    private secret: string;
    private url: string = 'https://ws.audioscrobbler.com/2.0/';

    constructor(key: string, secret: string) {
        this.key = key;
        this.secret = secret;
    }

    public getUserInfo(user: string) {
        return axios.get(this.url, {
            params: {
                method: 'user.getinfo',
                user,
                api_key: this.key,
                format: 'json',
            },
        });
    }
}

