/* eslint-disable no-param-reassign, no-unused-vars, no-shadow */
import _ from 'lodash';
import { userService } from '../../../modules/users/_services';
import router from '../../../router';
import { userRightsEnum, guest } from '../../../global/constants';
import { isNonemptyArray } from '../../../global/utils';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

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
          router.push('/maps/');
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

const getters = { // All for current user
  // Note that firstName and lastName are required, so guaranteed to be non-empty
  /* eslint-disable max-len */
  currentUserFullName: moduleState => `${moduleState.user.firstName || ''} ${moduleState.user.lastName || guest}`,
  currentUsername: moduleState => (moduleState.user ? moduleState.user.username || guest : guest),
  // eslint-disable-next-line no-nested-ternary
  currentUserLoggedIn: moduleState => (moduleState.status ? moduleState.status.loggedIn : false),
  /* eslint-enable max-len */

  // Sort by the right (each starts with integer) then find the first for the given opsCode
  currentUserBestRightForOPS: moduleState => (opsCode) => {
    let result = userRightsEnum.none;
    if (moduleState.user && isNonemptyArray(moduleState.user.rightsArray)) {
      const bestRight = _.find(
        _.sortBy(
          moduleState.user.rightsArray,
          [ur => ur.userRight],
        ),
        r => !r.opsCode || r.opsCode === opsCode,
      );
      // console.log(result, bestRight);
      if (bestRight) {
        result = bestRight.userRight;
      }
    }
    return result;
  },
};

const account = {
  // namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export default account;
