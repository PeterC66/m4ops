import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import M4OPSView from './views/M4OPSView.vue';
import Form from './views/Form.vue';
import NotFound from './global/components/NotFound.vue';

import LoginPage from './views/LoginPage.vue';
import LogoutPage from './views/LogoutPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import ManagePage from './views/ManagePage.vue';
import validateUserAndSetInitialValues from './modules/users/validateEtc';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  // From https://dev.to/napoleon039/the-lesser-known-amazing-things-vuerouter-can-do-25di
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
      path: '/logout',
      name: 'logout',
      component: LogoutPage,
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
      path: '/maps/:ops?'
      + '/:layers([A-Za-z]\\w*)*'
      + '/:opacities(\\d+)*'
      + '(/[ZF])?:ZoomOrFitTo(\\d+)?'
      + '/:Lon([-+]?\\d+\\.?\\d*)?'
      + '/:Lat([-+]?\\d+\\.?\\d*)?',
      name: 'maps',
      component: M4OPSView,
      beforeEnter: validateUserAndSetInitialValues,
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
  // redirect to login page if not logged in and trying to access a restricted page (eg Manage)
  const publicPages = [
    '/',
    '/login',
    '/logout',
    '/register',
    '/about',
  ];
  let authRequired = !publicPages.includes(to.path);
  if (to.path.startsWith('/maps')) authRequired = false; // Handled by M4OPSView
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});


export default router;
