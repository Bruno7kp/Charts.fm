import User from '@/charts/user';

export default {
  addUser: (context: any, user: User) => {
    if (!context.getters.getUser(user.login)) {
      context.commit('ADD_USER', user);
    }

    if (context.getters.getUsersCount() === 1) {
      context.commit('SET_CURRENT_USER', { login: user.login });
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
};
