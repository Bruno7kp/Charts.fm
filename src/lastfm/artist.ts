import axios from 'axios';
import LastFmApiWrapper, { LastFmApi } from '@/lastfm/lastfm';

export default class LastFmArtistApi implements LastFmApi {
    public lastfm: LastFmApiWrapper;

    constructor(lastfm: LastFmApiWrapper) {
        this.lastfm = lastfm;
    }

    public getInfo(artist: string, mbid: string = '', username: string = '') {
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'artist.getinfo',
                format: 'json',
                artist,
                mbid,
                lang: this.lastfm.getLang(),
                autocorrect: this.lastfm.isAutocorrect(),
                username,
            },
        });
    }
}
