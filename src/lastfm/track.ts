import axios from 'axios';
import LastFm, { LastFmApi } from '@/lastfm/lastfm';

export default class LastFmTrackApi implements LastFmApi {
    public lastfm: LastFm;

    constructor(lastfm: LastFm) {
        this.lastfm = lastfm;
    }

    public getInfo(artist: string, track: string, mbid: string = '', username: string = '') {
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'track.getinfo',
                format: 'json',
                artist,
                track,
                mbid,
                lang: this.lastfm.getLang(),
                autocorrect: this.lastfm.isAutocorrect(),
                username,
            },
        });
    }
}
