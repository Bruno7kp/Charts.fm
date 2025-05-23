import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
      props: { type: 'artists', week: 0 },
      meta: { requiresUser: true },
    },
    {
      path: '/weekly/artists/:week?',
      name: 'weekly.artists',
      component: () => import('./views/Week.vue'),
      props: { type: 'artists' },
      meta: { requiresUser: true },
    },
    {
      path: '/weekly/albums/:week?',
      name: 'weekly.albums',
      component: () => import('./views/Week.vue'),
      props: { type: 'albums' },
      meta: { requiresUser: true },
    },
    {
      path: '/weekly/tracks/:week?',
      name: 'weekly.tracks',
      component: () => import('./views/Week.vue'),
      props: { type: 'tracks' },
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
    {
      path: '/weekly/stats/most_top_xs/:type',
      name: 'weekly.stats.most_top_xs',
      component: () => import('./views/Stats/MostTopXs.vue'),
      meta: { requiresUser: true },
      props: true,
    },
    {
      path: '/weekly/stats/pak',
      name: 'weekly.stats.allkill',
      component: () => import('./views/Stats/PerfectAllKill.vue'),
      meta: { requiresUser: true },
      props: true,
    },
    {
      path: '/weekly/stats/most_plays/:type',
      name: 'weekly.stats.most_plays',
      component: () => import('./views/Stats/MostPlays.vue'),
      meta: { requiresUser: true },
      props: true,
    },
    {
      path: '/weekly/stats/debut/:type',
      name: 'weekly.stats.debut',
      component: () => import('./views/Stats/BiggestDebuts.vue'),
      meta: { requiresUser: true },
      props: true,
    },
    {
      path: '/weekly/stats/points/:type',
      name: 'weekly.stats.points',
      component: () => import('./views/Stats/MostPoints.vue'),
      meta: { requiresUser: true },
      props: true,
    },
    {
      path: '/weekly/stats/most_top_xs_by_artist/:type',
      name: 'weekly.stats.artist_tracks',
      component: () => import('./views/Stats/MostTopXsByArtist.vue'),
      meta: { requiresUser: true },
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
