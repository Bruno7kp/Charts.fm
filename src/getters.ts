import { User } from '@/charts';
import * as moment from 'moment';

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
        const defaultUser = getters.getUser(state.defaultUser);
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
};
