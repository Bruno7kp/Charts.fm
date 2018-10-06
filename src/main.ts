import Vue from 'vue';
import router from './router';
import _ from 'lodash';
import './registerServiceWorker';
import appMutations from './mutations';
import appGetters from './getters';
import appActions from './actions';

import Vuex from 'vuex';
import LocalForage from 'localforage';
import 'localforage-getitems';
import 'localforage-setitems';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';

import moment from 'moment';
import 'moment-timezone';

const VueAnalytics = require('vue-analytics').default;

Vue.use(Vuex);
Vue.use(VueAnalytics, {
  id: 'UA-126624153-2',
  router,
});

LocalForage.config({
  driver      : LocalForage.INDEXEDDB,
  name        : 'ChartsFm',
  version     : 1.0,
  storeName   : 'charts',
});

const persistPlugin = (store: any) => {
  store.subscribe((mutations: any, state: any) => {
      // @ts-ignore
      LocalForage.setItems(state);
  });
};

const initialState = {
  users: [],
  lang: 'en',
  timezone: moment.tz.guess(),
  currentUser: '',
  cardOpen: {
    updateWeek: true,
    settingsWeek: true,
    settingsTable: true,
  },
  theme: 'light',
  table: {
    previousRank: [true],
    peak: [true],
    onChart: [true],
    previousPlaycount: [true],
    small: [true],
    striped: [],
    bordered: [],
    hover: [],
    previous: 'previous',
    colored: [true],
    times: [],
  },
};

async function initializeApp() {
  // @ts-ignore
  const savedState = await LocalForage.getItems();
  const mergedStates = _.merge({}, initialState, savedState);
  const store = new Vuex.Store({
      plugins: [persistPlugin],
      state: mergedStates,
      mutations: appMutations,
      getters: appGetters,
      actions: appActions,
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresUser)) {
      if (store.getters.getUsersCount === 0) {
        next({
          path: '/',
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  Vue.config.productionTip = false;
  Vue.use(BootstrapVue);

  new Vue({
      router,
      store,
      render: (h) => h(App),
  }).$mount('#app');
}

initializeApp();
