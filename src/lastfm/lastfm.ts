import axios from 'axios';
import LastFmUserApi from '@/lastfm/user';
import LastFmArtistApi from '@/lastfm/artist';
import LastFmAlbumApi from '@/lastfm/album';
import LastFmTrackApi from '@/lastfm/track';

export default class LastFmApiWrapper {
    private key: string | undefined;
    private baseUrl: string;
    private lang: string = 'en';
    private autocorrect: boolean = false;
    // APIS
    private userApi: LastFmUserApi;
    private albumApi: LastFmAlbumApi;
    private artistApi: LastFmArtistApi;
    private trackApi: LastFmTrackApi;

    constructor(key: string | undefined, baseUrl: string = 'https://ws.audioscrobbler.com/2.0/') {
        this.key = key;
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

    public getKey(): string | undefined {
        return this.key;
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
    lastfm: LastFmApiWrapper;
}
