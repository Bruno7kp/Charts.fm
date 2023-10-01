import Vue from 'vue';
import router from './router';
import _ from 'lodash-es';
import './registerServiceWorker';
import appMutations from './mutations';
import appGetters from './getters';
import appActions from './actions';

import Vuex from 'vuex';
import LocalForage from 'localforage';
import 'localforage-getitems';
import 'localforage-setitems';

import moment from 'moment';
import 'moment-timezone';

import VueI18n from 'vue-i18n';
import messages from './lang';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Notifications from 'vue-notification';

import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLastfm, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faUser, faCog, faTrash, faTable, faSyncAlt, faChevronUp, faChevronDown, faChevronRight, faMusic, faCompactDisc,
  faAngleDoubleLeft, faAngleDoubleRight, faAngleRight, faAngleLeft, faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faSave } from '@fortawesome/free-regular-svg-icons';
//import { Promised, usePromise } from 'vue-promised';

library.add(
  faUser, faLastfm, faGithub, faCommentAlt, faCog, faSave, faTrash, faTable, faSyncAlt, faChevronUp, faChevronDown,
  faChevronRight, faMusic, faCompactDisc, faAngleDoubleLeft, faAngleDoubleRight, faAngleRight, faAngleLeft, faShareAlt);

/* tslint:disable:no-var-requires */
const fontawesome = require('@fortawesome/vue-fontawesome');
Vue.component('font-awesome-icon', fontawesome.FontAwesomeIcon);

// tslint:disable-next-line:no-var-requires
//const Promised = require('vue-promised').default;
// tslint:disable-next-line:no-var-requires
const VueAnalytics = require('vue-analytics').default;
// tslint:disable-next-line:no-var-requires
const VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo, {
  duration: 1000,
  easing: 'ease-in-out',
});
Vue.use(Vuex);
Vue.use(VueAnalytics, {
  id: 'UA-126624153-2',
  router,
});
//Vue.component('Promised', Promised);
Vue.use(Notifications);
Vue.use(VueI18n);

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

const expire = new Date();
expire.setDate(expire.getDate() + 15);

const initialState = {
  users: [],
  lang: navigator.language.substring(0, 2),
  timezone: moment.tz.guess(),
  currentUser: '',
  cardOpen: {
    updateWeek: true,
    settingsWeek: true,
    settingsTable: true,
  },
  theme: 'light',
  table: {
    previous: 'diff',
    opts: [
      'previousRank',
      'small',
      'striped',
      'colored',
      'images',
    ],
  },
  images: {
    artists: {},
    albums: {},
    expire,
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

  const i18n = new VueI18n({
    locale: store.state.lang, // set locale
    fallbackLocale: 'en',
    messages, // set locale messages
  });

  new Vue({
      router,
      store,
      i18n,
      render: (h) => h(App),
  }).$mount('#app');
}

initializeApp();
