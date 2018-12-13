import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import M4OPSView from './views/M4OPSView.vue';
import NotFound from './global/components/NotFound.vue';
import Callback from './modules/auth/Callback.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/maps',
      name: 'maps',
      component: M4OPSView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // eslint-disable-next-line max-len
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});
