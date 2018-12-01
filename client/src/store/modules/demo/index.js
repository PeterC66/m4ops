import { SHOW_LEVEL_SET_REQUEST } from '../../mutation-types';

const state = {
  showLevel: 0,
};

const mutations = {
  [SHOW_LEVEL_SET_REQUEST](moduleState, payload) {
    moduleState.showLevel = payload.showLevel;
  },
};

const actions = {
  selectActiveTab({ commit }, showLevel) {
    commit(SHOW_LEVEL_SET_REQUEST, { showLevel });
  },
};

const getters = {
};

const demoModule = {
  state,
  mutations,
  actions,
  getters,
};

export default demoModule;
