import { SIDEBAR_SWITCH_REQUEST } from '../../mutation-types';

const state = {
  sidebarOpen: true,
};

const mutations = {
  [SIDEBAR_SWITCH_REQUEST](moduleState, payload) {
    moduleState.sidebarOpen = payload.sidebarOpen;
  },
};

const actions = {
  switchSidebar({ commit }, sidebarOpen) {
    commit(SIDEBAR_SWITCH_REQUEST, { sidebarOpen });
  },
};

const getters = {
};

const frameworkModule = {
  state,
  mutations,
  actions,
  getters,
};

export default frameworkModule;
