import axios from 'axios';
import LastFmUserApi from '@/lastfm/user';
import LastFmArtistApi from '@/lastfm/artist';
import LastFmAlbumApi from '@/lastfm/album';
import LastFmTrackApi from '@/lastfm/track';

export default class LastFm {
    private key: string;
    private secret: string;
    private baseUrl: string;
    private lang: string = 'en';
    private autocorrect: boolean = false;
    // APIS
    private userApi: LastFmUserApi;
    private albumApi: LastFmAlbumApi;
    private artistApi: LastFmArtistApi;
    private trackApi: LastFmTrackApi;

    constructor(key: string, secret: string, baseUrl: string = 'https://ws.audioscrobbler.com/2.0/') {
        this.key = key;
        this.secret = secret;
        this.baseUrl = baseUrl;

        this.userApi = new LastFmUserApi(this);
        this.albumApi = new LastFmAlbumApi(this);
        this.artistApi = new LastFmArtistApi(this);
        this.trackApi = new LastFmTrackApi(this);
    }

    public setLang(lang: string) {
        this.lang = lang;
    }

    public setAutocorrect(autocorrect: boolean) {
        this.autocorrect = autocorrect;
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

    public getLang(): string {
        return this.lang;
    }

    public isAutocorrect(): number {
        return this.autocorrect ? 1 : 0;
    }

    public user(): LastFmUserApi {
        return this.userApi;
    }

    public album(): LastFmAlbumApi {
        return this.albumApi;
    }

    public artist(): LastFmArtistApi {
        return this.artistApi;
    }

    public track(): LastFmTrackApi {
        return this.trackApi;
    }
}

export interface LastFmApi {
    lastfm: LastFm;
}
