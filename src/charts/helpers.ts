import moment from 'moment';
import { Week, Artist, Album, Track } from '@/charts';

const fixedStartDate = (start: Date, weekDay: number) => {
    const n = moment(start).day(weekDay);
    if (n.toDate() > start) {
        n.subtract(1, 'weeks');
    }
    const date = n.toDate();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
};

const getWeeklyList = (start: Date, end: Date, limit: number) => {
    const weeks = [];
    let next = moment(start).add(1, 'weeks').toDate();
    while (next <= end) {
        weeks.push(new Week(start, next, limit));
        start = next;
        next = moment(start).add(1, 'weeks').toDate();
    }
    return weeks;
};

const fixArtistChart = (data: any, limit: number) => {
    const chart: Artist[] = [];
    const list = data.weeklyartistchart.artist;
    if (list.length < limit) {
        limit = list.length;
    }
    for (let i = 0; i < limit; i++) {
        chart.push(new Artist(list[i].name, parseInt(list[i]['@attr'].rank, 10), parseInt(list[i].playcount, 10)));
    }
    return chart;
};

const fixAlbumChart = (data: any, limit: number) => {
    const chart: Album[] = [];
    const list = data.weeklyalbumchart.album;
    if (list.length < limit) {
        limit = list.length;
    }
    for (let i = 0; i < limit; i++) {
        chart.push(
            new Album(
                list[i].name,
                list[i].artist['#text'],
                parseInt(list[i]['@attr'].rank, 10),
                parseInt(list[i].playcount, 10)));
    }
    return chart;
};

const fixTrackChart = (data: any, limit: number) => {
    const chart: Track[] = [];
    const list = data.weeklytrackchart.track;
    if (list.length < limit) {
        limit = list.length;
    }
    for (let i = 0; i < limit; i++) {
        chart.push(
            new Track(
                list[i].name,
                list[i].artist['#text'],
                parseInt(list[i]['@attr'].rank, 10),
                parseInt(list[i].playcount, 10)));
    }
    return chart;
};

export { fixedStartDate, getWeeklyList, fixArtistChart, fixAlbumChart, fixTrackChart };
