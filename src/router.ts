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
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Blog.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'post',
      component: () => import('./views/Post.vue'),
      props: true,
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
    {
      path: '/weekly/stats/number_ones/:type',
      name: 'weekly.stats.number_ones',
      component: () => import('./views/Stats/AllNumberOnes.vue'),
      meta: { requiresUser: true },
      props: true,
    },
    {
      path: '/weekly/stats/most_number_ones/:type',
      name: 'weekly.stats.most_number_ones',
      component: () => import('./views/Stats/MostNumberOnes.vue'),
      meta: { requiresUser: true },
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
