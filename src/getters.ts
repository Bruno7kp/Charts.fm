import { User, Week, Artist, Album, Track } from '@/charts';
import * as moment from 'moment';
import { Stats } from '@/charts';
import { getUserChartList } from '@/charts/helpers';

export default {
    getUser: (state: any) => (login: string) => {
        return state.users.find((user: User) => user.login === login);
    },
    getUsers: (state: any) => {
        return state.users;
    },
    getUsersAsOptions: (state: any, getters: any) => {
        const options: object[] = [];
        const users = getters.getUsers;
        for (const user of users) {
            options.push({ value: user.login, text: user.login });
        }
        return options;
    },
    getUsersCount: (state: any, getters: any) => {
        return getters.getUsers.length;
    },
    getDefaultUser: (state: any, getters: any) => {
        const defaultUser = getters.getUser(state.currentUser);
        if (defaultUser) {
            return defaultUser;
        }
        const users = getters.getUsers;
        if (users.length > 0) {
            return users[0];
        }
        return null;
    },
    getDefaultUserName: (state: any, getters: any) => {
        const defaultName = getters.getDefaultUser;
        if (defaultName !== null) {
            return defaultName.login;
        }
        return null;
    },
    getStats: (state: any, getters: any) =>
    (chart: string, type: string, name: string, artist: string|null = null) => {

        const user = getters.getDefaultUser;
        const stats = new Stats(type, name, artist);
        const searchAT = (entry: Album|Track) => entry.name === name && entry.artist === artist;
        const searchA = (entry: Artist) => entry.name === name;
        const search = (type !== 'artists' && type !== 'artist') ? searchAT : searchA;
        if (user !== null) {
            const charts = getUserChartList(user, chart);
            for (let i = 0; i < charts.length; i++) {
                stats.add(i, charts[i], charts[i][type].find(search));
            }
        }
        return stats;
    },
    getWeekDays: (state: any) => {
        const wk = moment.weekdays();
        const days = [];
        for (const key in wk) {
          if (wk.hasOwnProperty(key)) {
            days.push({ value: key, text: wk[key] });
          }
        }
        return days;
    },
    getCardOpen: (state: any) => {
        return state.cardOpen;
    },
    getTable: (state: any) => {
        return state.table;
    },
    getImages: (state: any) => {
        return state.images;
    },
};
