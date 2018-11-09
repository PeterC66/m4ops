import {
  SIDEBAR_SWITCH_REQUEST,
  TAB_SELECT_REQUEST,
} from '../../mutation-types';

const state = {
  sidebarOpen: true,
  activeTabNumber: 0,
};

const mutations = {
  [SIDEBAR_SWITCH_REQUEST](moduleState, payload) {
    moduleState.sidebarOpen = payload.sidebarOpen;
  },
  [TAB_SELECT_REQUEST](moduleState, payload) {
    moduleState.activeTabNumber = payload.activeTabNumber;
  },
};

const actions = {
  switchSidebar({ commit }, sidebarOpen) {
    commit(SIDEBAR_SWITCH_REQUEST, { sidebarOpen });
  },
  selectActiveTab({ commit }, activeTab) {
    commit(TAB_SELECT_REQUEST, { activeTabNumber: activeTab });
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
