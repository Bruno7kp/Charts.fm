import axios from 'axios';
import LastFmUserApi from '@/lastfm/user';

export default class LastFm {
    private key: string;
    private secret: string;
    private baseUrl: string;
    // APIS
    private userApi: LastFmUserApi;

    constructor(key: string, secret: string, baseUrl: string = 'https://ws.audioscrobbler.com/2.0/') {
        this.key = key;
        this.secret = secret;
        this.baseUrl = baseUrl;
        this.userApi = new LastFmUserApi(this);
    }

    public getKey(): string {
        return this.key;
    }

    public getSecret(): string {
        return this.secret;
    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public user(): LastFmUserApi {
        return this.userApi;
    }
}

export interface LastFmApi {
    lastfm: LastFm;
}
