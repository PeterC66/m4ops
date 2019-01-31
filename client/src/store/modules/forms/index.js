// import _ from 'lodash';

import {
  HIDE_PORTAL,
  SHOW_PORTAL,
} from '../../mutation-types';

const state = {
  formInPortal: '',
};

const mutations = {
  [HIDE_PORTAL](moduleState) {
    moduleState.formInPortal = '';
  },
  [SHOW_PORTAL](moduleState, payload) {
    moduleState.formInPortal = payload.formInPortal;
  },
};

const actions = {
  hidePortal({ commit }) {
    commit(HIDE_PORTAL);
  },
  showPortal({ commit }, formInPortal) {
    commit(SHOW_PORTAL, { formInPortal });
  },
};

const getters = {
};

const formsModule = {
  state,
  mutations,
  actions,
  getters,
};

export default formsModule;
