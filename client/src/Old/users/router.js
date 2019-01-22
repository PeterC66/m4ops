/*
import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import LoginPage from '../login/LoginPage.vue';
import RegisterPage from '../register/RegisterPage.vue';

Vue.use(Router);

// eslint-disable-next-line import/prefer-default-export
export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },

    // otherwise redirect to home
    { path: '*', redirect: '/' },
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
*/