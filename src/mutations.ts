import Vue from 'vue';
import _ from 'lodash';
import User from '@/charts/user';

export default {
    ADD_USER(state: any, user: User) {
        state.users.push(user);
    },
    SET_CURRENT_USER(state: any, user: User) {
        state.currentUser = user.login;
    },
    DELETE_USER(state: any, user: User) {
        state.users = state.users.filter((item: User) => item.login !== user.login);
    },
    SET_TIMEZONE(state: any, timezone: string) {
        state.timezone = timezone;
    },
};
