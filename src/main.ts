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

Vue.use(Vuex);

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
  timezone: '',
  currentUser: '',
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

  Vue.config.productionTip = false;
  Vue.use(BootstrapVue);

  new Vue({
      router,
      store,
      render: (h) => h(App),
  }).$mount('#app');
}

initializeApp();
