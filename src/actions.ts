import User from '@/charts/user';

export default {
  addUser: (context: any, user: User) => {
    if (!context.getters.getUser(user.login)) {
      context.commit('ADD_USER', user);
    }
    context.commit('SET_CURRENT_USER', { login: user.login });
  },
  updateUser: (context: any, user: User) => {
    if (context.getters.getUser(user.login)) {
      context.commit('UPDATE_USER', user);
    }
  },
  setCurrentUser: (context: any, user: string) => {
    context.commit('SET_CURRENT_USER', { login: user });
  },
  removeUser: (context: any, user: string) => {
    context.commit('DELETE_USER', { login: user });
    context.commit('SET_CURRENT_USER', { login: '' });
  },
  setTimezone: (context: any, timezone: string) => {
    context.commit('SET_TIMEZONE', timezone);
  },
  setTheme: (context: any, theme: string) => {
    context.commit('SET_THEME', theme);
  },
  setLang: (context: any, lang: string) => {
    context.commit('SET_LANG', lang);
  },
  setCardOpen: (context: any, cardOpen: object) => {
    context.commit('SET_CARD_OPEN', cardOpen);
  },
  setTable: (context: any, table: object) => {
    context.commit('SET_TABLE', table);
  },
  setImages: (context: any, images: object) => {
    context.commit('SET_IMAGES', images);
  },
  cleanImages: (context: any) => {
    const expire = new Date();
    expire.setDate(expire.getDate() + 15);
    context.commit('SET_IMAGES', {artists: {}, albums: {}, expire});
  },
};
