import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/weekly',
      name: 'weekly',
      component: () => import('./views/Week.vue'),
      meta: { requiresUser: true },
    },
    {
      path: '/weekly/stats',
      name: 'weekly.stats',
      component: () => import('./views/WeekStats.vue'),
      meta: { requiresUser: true },
    },
    {
      path: '/weekly/live',
      name: 'weekly.live',
      component: () => import('./views/WeekLive.vue'),
      meta: { requiresUser: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
