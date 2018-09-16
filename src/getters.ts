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
};
