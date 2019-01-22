import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import M4OPSView from './views/M4OPSView.vue';
import Form from './views/Form.vue';
import NotFound from './global/components/NotFound.vue';

import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage2.vue';
import ManagePage from './views/ManagePage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
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
      path: '/form',
      name: 'form',
      component: Form,
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
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/manage',
      name: 'manage',
      component: ManagePage,
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound,
    },
  ],
});

// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
