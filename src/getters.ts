import User from '@/charts/user';

export default {
    getUser: (state: any) => (login: string) => {
        return state.users.find((user: User) => user.login === login);
    },
    getUsers: (state: any) => {
        return state.users;
    },
    getUsersCount: (state: any, getters: any) => {
        return getters.getUsers.lenght;
    },
    getDefaultUser: (state: any, getters: any) => {
        const defaultUser = getters.getUser(state.defaultUser);
        if (defaultUser) {
            return defaultUser;
        }
        const users = getters.getUsers();
        if (users.lenght > 0) {
            return users[0];
        }
        return null;
    },
    getDefaultUserName: (state: any, getters: any) => {
        const defaultName = getters.getDefaultUser;
        if (defaultName instanceof User) {
            return defaultName.login;
        }
        return null;
    },
};
