import moment, { weekdays } from 'moment';
import {Week, Artist, Album, Track, User, WeeklyCharts, MonthlyCharts, YearlyCharts, Stats} from '@/charts';

const listLimit = 1000;

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

export const getMostPlays = (
    weeks: any[],
    type: string,
    rank: number | null = null,
    year: string | null = null
) => {
    let y = null;
    if (year && parseInt(year, 10) > 0) {
        y = year;
    }

    let topEntries: any[] = [];
    let minPlaycountInTop = 0;

    for (let i = 0; i < weeks.length; i++) {
        const week = weeks[i];
        const items = week[type];

        if (!items || !Array.isArray(items)) continue;
        if (y && moment(week.end).format('YYYY') !== y) continue;

        const filteredItems = rank !== null && rank > 0
            ? items.filter(item => item.rank === rank)
            : items;

        for (const entry of filteredItems) {
            const playcount = entry.playcount;

            // Otimização: se já temos listLimit e playcount menor que o menor atual, ignora
            if (topEntries.length >= listLimit && playcount <= minPlaycountInTop) {
                continue;
            }

            const obj: any = {
                name: entry.name,
                playcount: entry.playcount,
                rank: entry.rank,
                week: i + 1,
                week_end: moment(week.end).format('YYYY-MM-DD'),
                week_start: moment(week.start).format('YYYY-MM-DD'),
            };

            if (type !== 'artists') {
                obj.artist = entry.artist;
                obj.id = `${entry.name} - ${entry.artist}`;
            } else {
                obj.id = entry.name;
            }

            topEntries.push(obj);

            // Ordena e mantém apenas os listLimit com maior playcount
            topEntries.sort((a, b) => b.playcount - a.playcount);
            if (topEntries.length > listLimit) {
                topEntries.length = listLimit;
            }

            minPlaycountInTop = topEntries[topEntries.length - 1].playcount;
        }
    }

    return topEntries;
};

export const getBiggestDebuts = (
    weeks: any[],
    type: string,
    rank: number | null = null,
    year: string | null = null
) => {
    let y = null;
    if (year && parseInt(year, 10) > 0) {
        y = year;
    }
    const seen = new Set<string>();
    let topEntries: any[] = [];
    let minPlaycountInTop = 0;

    for (let i = 0; i < weeks.length; i++) {
        const week = weeks[i];
        const items = week[type];

        if (!items || !Array.isArray(items)) continue;

        const filteredItems = (rank !== null && rank > 0)
            ? items.filter(item => item.rank === rank)
            : items;

        for (const entry of filteredItems) {
            let id = entry.name;
            if (type !== 'artists') {
                id += ' - ' + entry.artist;
            }

            if (seen.has(id)) continue;
            seen.add(id);

            const weekYear = moment(week.end).format('YYYY');
            if (y && weekYear !== y) continue; // só inclui se for do ano filtrado

            const playcount = entry.playcount;
            if (topEntries.length >= listLimit && playcount <= minPlaycountInTop) continue;

            const obj: any = {
                name: entry.name,
                playcount: playcount,
                rank: entry.rank,
                week: i + 1,
                week_end: moment(week.end).format('YYYY-MM-DD'),
                week_start: moment(week.start).format('YYYY-MM-DD'),
                id,
            };

            if (type !== 'artists') {
                obj.artist = entry.artist;
            }

            topEntries.push(obj);

            // Ordena e mantém apenas os listLimit maiores
            topEntries.sort((a, b) => b.playcount - a.playcount);
            if (topEntries.length > listLimit) {
                topEntries.length = listLimit;
            }

            minPlaycountInTop = topEntries[topEntries.length - 1].playcount;
        }
    }

    return topEntries;
};

export const getTopByPoints = (
    weeks: any[],
    type: string,
    year: string | null = null
) => {
    const pointsMap: Record<string, {
        name: string;
        artist?: string;
        points: number;
        weeks: number;
    }> = {};

    let y = null;
    if (year && parseInt(year, 10) > 0) {
        y = year;
    }

    for (let i = 0; i < weeks.length; i++) {
        const week = weeks[i];
        const items = week[type];

        if (!items || !Array.isArray(items)) continue;

        const weekYear = moment(week.end).format('YYYY');
        if (y !== null && weekYear !== y) continue;

        for (const entry of items) {
            const rank = entry.rank;
            if (typeof rank !== 'number' || rank < 1 || rank > 100) continue;

            const points = 101 - rank;

            let id = entry.name;
            if (type !== 'artists') {
                id += ' - ' + entry.artist;
            }

            if (!pointsMap[id]) {
                pointsMap[id] = {
                    name: entry.name,
                    artist: type !== 'artists' ? entry.artist : undefined,
                    points: 0,
                    weeks: 0
                };
            }

            pointsMap[id].points += points;
            pointsMap[id].weeks += 1;
        }
    }

    // Converte para array ordenado por pontos
    const result = Object.entries(pointsMap)
        .map(([id, data]) => ({ id, ...data }))
        .sort((a, b) => b.points - a.points);

    return result;
};

export const getArtistsWithMostEntriesInTopX = (
    weeks: any[],
    type: 'albums' | 'tracks',
    topX: number,
    year: string | null = null
) => {

    const artistMap: Record<string, {
        artist: string;
        uniqueItems: Set<string>;
        totalWeeks: number;
    }> = {};

    let y = null;
    if (year && parseInt(year, 10) > 0) {
        y = year;
    }

    for (let i = 0; i < weeks.length; i++) {
        const week = weeks[i];
        const items = week[type];

        if (!items || !Array.isArray(items)) continue;

        const weekYear = moment(week.end).format('YYYY');
        if (y !== null && weekYear !== y) continue;

        for (const entry of items) {
            const rank = entry.rank;
            if (typeof rank !== 'number' || rank < 1 || rank > topX) continue;

            const artist = entry.artist;
            const itemId = entry.name;

            if (!artistMap[artist]) {
                artistMap[artist] = {
                    artist,
                    uniqueItems: new Set<string>(),
                    totalWeeks: 0
                };
            }

            // Adiciona o item (álbum/música) único
            artistMap[artist].uniqueItems.add(itemId);

            // Soma semana
            artistMap[artist].totalWeeks += 1;
        }
    }

    // Converte para array ordenado
    const result = Object.values(artistMap)
        .map(entry => ({
            artist: entry.artist,
            total_items: entry.uniqueItems.size,
            total_weeks: entry.totalWeeks
        }))
        .sort((a, b) => {
            // Ordena por total de itens, depois por semanas
            if (b.total_items !== a.total_items) {
                return b.total_items - a.total_items;
            }
            return b.total_weeks - a.total_weeks;
        });

    return result;
};

const getListAtRankX = (weeks: any[], type: string, rank: number, year: string|null = null) => {
    let filter = [];
    let y = null;
    if (year && parseInt(year, 10) > 0) {
        y = year;
    }
    let times: Record<string, number> = {};
    for (let i = 0; i < weeks.length; i++) {
        if (weeks[i][type][rank - 1] && (y === null || moment(weeks[i].end).format('YYYY') === y)) {
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
                week_end: moment(weeks[i].end).format('YYYY-MM-DD'),
                week_start: moment(weeks[i].start).format('YYYY-MM-DD'),
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

const getRankListAtRankX = (weeks: any[], type: string, rank: number, year: string|null = null) => {
    let filter = [];
    let f = 0;
    let y = null;
    if (year && parseInt(year, 10) > 0) {
        y = year;
    }
    let times: Record<string, number> = {};
    for (let i = 0; i < weeks.length; i++) {
        if (weeks[i][type][rank - 1] && (y === null || moment(weeks[i].end).format('YYYY') === y)) {
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

const getRankListAtTopX = (weeks: any[], type: string, rank: number, year: string|null = null) => {
    let filter = [];
    let f = 0;
    let y = null;
    if (year && parseInt(year, 10) > 0) {
        y = year;
    }
    let times: Record<string, number> = {};
    for (let i = 0; i < weeks.length; i++) {
        for (let j = 0; j < rank; j++) {
            if (weeks[i][type][j] && (y === null || moment(weeks[i].end).format('YYYY') === y)) {
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

const getPAKList = (weeks: any[], rank: number, year: string|null = null) => {
    let filter = [];
    let y = null;
    if (year && parseInt(year, 10) > 0) {
        y = year;
    }
    let times: Record<string, number> = {};
    for (let i = 0; i < weeks.length; i++) {
        const checkWeek = weeks[i]['artists'][rank - 1] && weeks[i]['albums'][rank - 1] && weeks[i]['tracks'][rank - 1];
        if (checkWeek && (y === null || moment(weeks[i].end).format('YYYY') === y)) {
            let checkName = weeks[i]['artists'][rank - 1].name;
            if (checkName === weeks[i]['albums'][rank - 1].artist && checkName === weeks[i]['tracks'][rank - 1].artist) {
                if (typeof times[checkName] === 'undefined') {
                    times[checkName] = 0;
                }
                times[checkName]++;
                let obj = {
                    week: i + 1,
                    week_end: moment(weeks[i].end).format('YYYY-MM-DD'),
                    week_start: moment(weeks[i].start).format('YYYY-MM-DD'),
                    artist: checkName,
                    album: weeks[i]['albums'][rank - 1].name,
                    track: weeks[i]['tracks'][rank - 1].name,
                    times: times[checkName],
                } as any;
                filter.push(obj);
            }
        }
    }
    filter.reverse();
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
    getPAKList,
};
