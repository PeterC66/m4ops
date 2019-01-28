/* eslint-disable no-param-reassign, no-shadow, no-unused-vars */
import { userService } from '../../../modules/users/_services';

const state = {
  all: {},
};

const mutations = {
  getAllRequest(state) {
    state.all = { loading: true };
  },
  getAllSuccess(state, users) {
    state.all = { items: users };
  },
  getAllFailure(state, error) {
    state.all = { error };
  },
  deleteRequest(state, id) {
    // add 'deleting:true' property to user being deleted
    state.all.items = state.all.items.map(user => (user.id === id
      ? { ...user, deleting: true }
      : user));
  },
  deleteSuccess(state, id) {
    // remove deleted user from state
    state.all.items = state.all.items.filter(user => user.id !== id);
  },
  deleteFailure(state, { id, error }) {
    // remove 'deleting:true' property and add 'deleteError:[error]' property to user
    state.all.items = state.items.map((user) => {
      if (user.id === id) {
        // make copy of user without 'deleting:true' property
        const { deleting, ...userCopy } = user;
        // return copy of user with 'deleteError:[error]' property
        return { ...userCopy, deleteError: error };
      }

      return user;
    });
  },
};

const actions = {
  getAllUsers({ commit }) {
    commit('getAllRequest');

    userService.getAllUsers()
      .then(
        users => commit('getAllSuccess', users),
        error => commit('getAllFailure', error),
      );
  },

  deleteUser({ commit }, id) {
    commit('deleteRequest', id);

    userService.deleteUser(id)
      .then(
        user => commit('deleteSuccess', id),
        error => commit('deleteSuccess', { id, error: error.toString() }),
      );
  },
};

const users = {
  // namespaced: true,
  state,
  actions,
  mutations,
};

export default users;
