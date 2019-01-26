/* eslint-disable no-param-reassign, no-unused-vars, no-shadow */
import _ from 'lodash';
import { userService } from '../../../modules/users/_services';
import router from '../../../router';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit('loginRequest', { username });

    userService.login(username, password)
      .then(
        (user) => {
          commit('loginSuccess', user);
          router.push('/');
        },
        (error) => {
          commit('loginFailure', error);
          dispatch('alert/error', error, { root: true });
        },
      );
  },
  logout({ commit }) {
    userService.logout();
    commit('logout');
  },
  register({ dispatch, commit }, user) {
    commit('registerRequest', user);

    userService.register(user)
      .then(
        (user) => {
          commit('registerSuccess', user);
          router.push('/');
          setTimeout(() => {
            // display success message after route change completes
            // eslint-disable-next-line max-len
            dispatch('alert/success', 'Registration successful', { root: true });
          });
        },
        (error) => {
          commit('registerFailure', error);
          dispatch('alert/error', error, { root: true });
        },
      );
  },
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state, user) {
    state.status = { registering: true };
  },
  registerSuccess(state, user) {
    state.status = {};
  },
  registerFailure(state, error) {
    state.status = {};
  },
};

const getters = { // All for current user
  // Note that firstName and lastName are required, so guaranteed to be non-empty
  // eslint-disable-next-line max-len
  fullName: moduleState => `${moduleState.user.firstName} ${moduleState.user.lastName}`,
  // Sort by the right (each starts with integer) then find the first for the given opsCode
  bestRightForOPS: moduleState => opsCode => _.find(
    _.sortBy(
      moduleState.user.rightsArray,
      [ur => ur.userRight],
    ),
    r => !r.opsCode || r.opsCode === opsCode,
  ).userRight,
};

const account = {
  // namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export default account;
