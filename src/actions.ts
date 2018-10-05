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
  },
  setTimezone: (context: any, timezone: string) => {
    context.commit('SET_TIMEZONE', timezone);
  },
  setCardOpen: (context: any, cardOpen: object) => {
    context.commit('SET_CARD_OPEN', cardOpen);
  },
  setTable: (context: any, table: object) => {
    context.commit('SET_TABLE', table);
  },
};
