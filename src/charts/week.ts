import LastFm from '@/lastfm';
import { fixArtistChart, fixAlbumChart, fixTrackChart, Artist, Album, Track } from '@/charts';

class Week {
    public start: Date;
    public end: Date;
    public artists: Artist[];
    public albums: Album[];
    public tracks: Track[];
    public limit: number;
    public untied: boolean;

    public constructor(start: Date, end: Date, limit: number) {
        this.start = start;
        this.end = end;
        this.limit = limit;
        this.artists = [];
        this.albums = [];
        this.tracks = [];
        this.untied = false;
    }

    public setUntied(untied: boolean) {
        this.untied = untied;
    }

    public load(login: string) {
        return new Promise((resolve, reject) => {
            const artists = LastFm.user().getWeeklyArtistChart(login, this.start, this.end);
            const albums = LastFm.user().getWeeklyAlbumChart(login, this.start, this.end);
            const tracks = LastFm.user().getWeeklyTrackChart(login, this.start, this.end);
            const charts = Promise.all([artists, albums, tracks]);
            charts.then((args) => {
                this.artists = fixArtistChart(args[0].data, this.limit, this.untied);
                this.albums = fixAlbumChart(args[1].data, this.limit, this.untied);
                this.tracks = fixTrackChart(args[2].data, this.limit, this.untied);
                resolve(this);
            }).catch((e) => {
                reject(e);
            });
        });
    }
}

export default Week;
