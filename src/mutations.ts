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
    UPDATE_USER(state: any, user: User) {
        const i = state.users.map((x: any) => x.login).indexOf(user.login);
        if (i >= 0) {
            state.users[i] = user;
        }
    },
    DELETE_USER(state: any, user: User) {
        state.users = state.users.filter((item: User) => item.login !== user.login);
    },
    SET_TIMEZONE(state: any, timezone: string) {
        state.timezone = timezone;
    },
    SET_LANG(state: any, lang: string) {
        state.lang = lang;
    },
    SET_CARD_OPEN(state: any, cardOpen: object) {
        state.cardOpen = cardOpen;
    },
    SET_TABLE(state: any, table: object) {
        state.table = table;
    },
    SET_IMAGES(state: any, images: object) {
        state.images = images;
    },
};
