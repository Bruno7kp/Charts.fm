import moment, { weekdays } from 'moment';
import {Week, Artist, Album, Track, User, WeeklyCharts, MonthlyCharts, YearlyCharts, Stats} from '@/charts';

const fixedStartDate = (start: Date, weekDay: number) => {
    const n = moment(start);
    const c = n.day(n.day() >= weekDay ? weekDay : (weekDay - 7));
    const date = c.toDate();
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

const fixArtistChart = (data: any, limit: number, untied: boolean = false) => {
    const chart: Artist[] = [];
    const list = data.weeklyartistchart.artist;
    if (list.length < limit || limit < 1) {
        limit = list.length;
    }
    let maxPlays = 0, plays = 0;
    for (let i = 0; i < limit; i++) {
        chart.push(new Artist(list[i].name, parseInt(list[i]['@attr'].rank, 10), parseInt(list[i].playcount, 10)));
        maxPlays = parseInt(list[i].playcount, 10);
    }
    if (untied && list.length > limit) {
        for (let i = limit; i < list.length; i++) {
            plays = parseInt(list[i].playcount, 10);
            if (plays === maxPlays) {
                chart.push(new Artist(list[i].name, parseInt(list[i]['@attr'].rank, 10), parseInt(list[i].playcount, 10)));
            } else {
                break;
            }
        }
    }
    return chart;
};

const fixAlbumChart = (data: any, limit: number, untied: boolean = false) => {
    const chart: Album[] = [];
    const list = data.weeklyalbumchart.album;
    if (list.length < limit || limit < 1) {
        limit = list.length;
    }
    let maxPlays = 0, plays = 0;
    for (let i = 0; i < limit; i++) {
        chart.push(
            new Album(
                list[i].name,
                list[i].artist['#text'],
                parseInt(list[i]['@attr'].rank, 10),
                parseInt(list[i].playcount, 10)));
        maxPlays = parseInt(list[i].playcount, 10);
    }
    if (untied && list.length > limit) {
        for (let i = limit; i < list.length; i++) {
            plays = parseInt(list[i].playcount, 10);
            if (plays === maxPlays) {
                chart.push(
                    new Album(
                        list[i].name,
                        list[i].artist['#text'],
                        parseInt(list[i]['@attr'].rank, 10),
                        parseInt(list[i].playcount, 10)));
            } else {
                break;
            }
        }
    }
    return chart;
};

const fixTrackChart = (data: any, limit: number, untied: boolean = false) => {
    const chart: Track[] = [];
    const list = data.weeklytrackchart.track;
    if (list.length < limit || limit < 1) {
        limit = list.length;
    }
    let maxPlays = 0, plays = 0;
    for (let i = 0; i < limit; i++) {
        chart.push(
            new Track(
                list[i].name,
                list[i].artist['#text'],
                parseInt(list[i]['@attr'].rank, 10),
                parseInt(list[i].playcount, 10)));
        maxPlays = parseInt(list[i].playcount, 10);
    }
    if (untied && list.length > limit) {
        for (let i = limit; i < list.length; i++) {
            plays = parseInt(list[i].playcount, 10);
            if (plays === maxPlays) {
                chart.push(
                    new Track(
                        list[i].name,
                        list[i].artist['#text'],
                        parseInt(list[i]['@attr'].rank, 10),
                        parseInt(list[i].playcount, 10)));
            } else {
                break;
            }
        }
    }
    return chart;
};

const getUserChart = (user: User, chart: string): WeeklyCharts|MonthlyCharts|YearlyCharts => {
    if (chart === 'year') {
        return user.yearlyCharts;
    } else if (chart === 'month') {
        return user.monthlyCharts;
    } else {
        return user.weeklyCharts;
    }
};

const getUserChartList = (user: User, chart: string): any => {
    if (chart === 'year') {
        return user.yearlyCharts.years;
    } else if (chart === 'month') {
        return user.monthlyCharts.months;
    } else {
        return user.weeklyCharts.weeks;
    }
};

const getUserChartLength = (user: User, chart: string): number => {
    if (chart === 'year') {
        return user.yearlyCharts.years.length;
    } else if (chart === 'month') {
        return user.monthlyCharts.months.length;
    } else {
        return user.weeklyCharts.weeks.length;
    }
};

const getDropouts = (chart: string, type: string, previous: any[], current: any[]) => {
    let dropouts = [];
    for (let i = 0; i < previous.length; i++) {
        if (type === 'artists') {
            if (current.find(x => x.name === previous[i].name) === undefined) {
                dropouts.push(previous[i]);
            }
        } else {
            if (current.find(x => x.name === previous[i].name && x.artist === previous[i].artist) === undefined) {
                dropouts.push(previous[i]);
            }
        }
    }
    return dropouts;
};

const getListAtRankX = (weeks: any[], type: string, rank: number) => {
    let filter = [];
    let times: Record<string, number> = {};
    for (let i = 0; i < weeks.length; i++) {
        if (weeks[i][type][rank - 1]) {
            let id = weeks[i][type][rank - 1].name;
            if (type !== 'artists') {
                id += ' - ' + weeks[i][type][rank - 1].artist;
            }
            if (typeof times[id] === 'undefined') {
                times[id] = 0;
            }
            times[id]++;
            let obj = {
                week: i + 1,
                week_full: moment(weeks[i].end).format('YYYY-MM-DD'),
                playcount: weeks[i][type][rank - 1].playcount,
                name: weeks[i][type][rank - 1].name,
                times: times[id],
            } as any;
            if (type !== 'artists') {
                obj.artist = weeks[i][type][rank - 1].artist;
            }
            filter.push(obj);
        }
    }
    filter.reverse();
    return filter;
}

const getRankListAtRankX = (weeks: any[], type: string, rank: number) => {
    let filter = [];
    let f = 0;
    let times: Record<string, number> = {};
    for (let i = 0; i < weeks.length; i++) {
        if (weeks[i][type][rank - 1]) {
            let id = weeks[i][type][rank - 1].name;
            if (type !== 'artists') {
                id += ' - ' + weeks[i][type][rank - 1].artist;
            }
            if (typeof times[id] === 'undefined') {
                times[id] = f;
                let obj = {
                    name: weeks[i][type][rank - 1].name,
                    last_week: moment(weeks[i].end).format('YYYY-MM-DD'),
                    times: 1,
                } as any;
                if (type !== 'artists') {
                    obj.artist = weeks[i][type][rank - 1].artist;
                }
                filter.push(obj);
                f++;
            } else {
                filter[times[id]].times++;
                filter[times[id]].last_week = moment(weeks[i].end).format('YYYY-MM-DD');
            }
        }
    }
    filter.sort((a, b) => b.times - a.times || new Date(a.last_week).getTime() - new Date(b.last_week).getTime());
    return filter;
}

const getRankListAtTopX = (weeks: any[], type: string, rank: number) => {
    let filter = [];
    let f = 0;
    let times: Record<string, number> = {};
    for (let i = 0; i < weeks.length; i++) {
        for (let j = 0; j < rank; j++) {
            if (weeks[i][type][j]) {
                let id = weeks[i][type][j].name;
                if (type !== 'artists') {
                    id += ' - ' + weeks[i][type][j].artist;
                }
                if (typeof times[id] === 'undefined') {
                    times[id] = f;
                    let obj = {
                        name: weeks[i][type][j].name,
                        last_week: moment(weeks[i].end).format('YYYY-MM-DD'),
                        times: 1,
                    } as any;
                    if (type !== 'artists') {
                        obj.artist = weeks[i][type][j].artist;
                    }
                    filter.push(obj);
                    f++;
                } else {
                    filter[times[id]].times++;
                    filter[times[id]].last_week = moment(weeks[i].end).format('YYYY-MM-DD');
                }
            }
        }
    }
    filter.sort((a, b) => b.times - a.times || new Date(a.last_week).getTime() - new Date(b.last_week).getTime());
    return filter;
}

const moveItem = (array: any[], oldIndex: number, newIndex: number) => {
    if (oldIndex < 0 || oldIndex >= array.length || newIndex < 0 || newIndex >= array.length) {
        return array; // Índices inválidos, retorna o array original
    }

    const itemMovido = array.splice(oldIndex, 1)[0]; // Remove o item do oldIndex e o guarda

    array.splice(newIndex, 0, itemMovido); // Insere o item na newIndex

    return array;
}


export {
    fixedStartDate,
    getWeeklyList,
    fixArtistChart,
    fixAlbumChart,
    fixTrackChart,
    getUserChart,
    getUserChartList,
    getUserChartLength,
    getListAtRankX,
    getRankListAtRankX,
    getRankListAtTopX,
    getDropouts,
    moveItem,
};
