import {
  SIDEBAR_SWITCH_REQUEST,
  TAB_SELECT_REQUEST,
} from '../../mutation-types';

const state = {
  sidebarOpen: true,
  activeTabName: 'actions',
};

const mutations = {
  [SIDEBAR_SWITCH_REQUEST](moduleState, payload) {
    moduleState.sidebarOpen = payload.sidebarOpen;
  },
  [TAB_SELECT_REQUEST](moduleState, payload) {
    moduleState.activeTabName = payload.activeTabName;
  },
};

const actions = {
  switchSidebar({ commit }, sidebarOpen) {
    commit(SIDEBAR_SWITCH_REQUEST, { sidebarOpen });
  },
  selectTab({ commit }, activeTabName) {
    commit(TAB_SELECT_REQUEST, { activeTabName });
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
