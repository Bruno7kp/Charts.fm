import axios from 'axios';
import LastFm, { LastFmApi } from '@/lastfm/lastfm';

export default class LastFmUserApi implements LastFmApi {
    public lastfm: LastFm;

    constructor(lastfm: LastFm) {
        this.lastfm = lastfm;
    }

    public getInfo(user: string) {
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'user.getinfo',
                format: 'json',
                user,
            },
        });
    }

    public getFriends(user: string, recenttracks: boolean, limit: number = 50, page: number = 1) {
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'user.getfriends',
                format: 'json',
                user,
                recenttracks: recenttracks ? 1 : 0,
                limit,
                page,
            },
        });
    }

    public getTopAlbums(user: string, period: string = 'overall', limit: number = 50, page: number = 1) {
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'user.gettopalbums',
                format: 'json',
                user,
                period,
                limit,
                page,
            },
        });
    }

    public getTopArtists(user: string, period: string = 'overall', limit: number = 50, page: number = 1) {
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'user.gettopartists',
                format: 'json',
                user,
                period,
                limit,
                page,
            },
        });
    }

    public getTopTracks(user: string, period: string = 'overall', limit: number = 50, page: number = 1) {
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'user.gettoptracks',
                format: 'json',
                user,
                period,
                limit,
                page,
            },
        });
    }

    public getWeeklyChartList(user: string) {
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'user.getweeklychartlist',
                format: 'json',
                user,
            },
        });
    }

    public getWeeklyAlbumChart(user: string, from: number|Date, to: number|Date) {
        if (from instanceof Date) {
            from = from.getTime() / 1000;
        }
        if (to instanceof Date) {
            to = to.getTime() / 1000;
        }
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'user.getweeklyalbumchart',
                format: 'json',
                user,
                from,
                to,
            },
        });
    }

    public getWeeklyArtistChart(user: string, from: number|Date, to: number|Date) {
        if (from instanceof Date) {
            from = from.getTime() / 1000;
        }
        if (to instanceof Date) {
            to = to.getTime() / 1000;
        }
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'user.getweeklyartistchart',
                format: 'json',
                user,
                from,
                to,
            },
        });
    }

    public getWeeklyTrackChart(user: string, from: number|Date, to: number|Date) {
        if (from instanceof Date) {
            from = from.getTime() / 1000;
        }
        if (to instanceof Date) {
            to = to.getTime() / 1000;
        }
        return axios.get(this.lastfm.getBaseUrl(), {
            params: {
                api_key: this.lastfm.getKey(),
                method: 'user.getweeklytrackchart',
                format: 'json',
                user,
                from,
                to,
            },
        });
    }
}
