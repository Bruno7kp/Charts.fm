import User from '@/charts/user';

export default {
    addUser: (context: any, user: User) => {
        if (!context.getters.getUser(user.login)) {
            context.commit('ADD_USER', user);
        }
        context.commit('SET_CURRENT_USER', { login: user.login });
    },
};
