import {
  SIDEBAR_SWITCH_REQUEST,
  TAB_SELECT_REQUEST,
  INTERACTIONS_ON_TOGGLE,
} from '../../mutation-types';

const state = {
  sidebarOpen: true,
  activeTabNumber: 0,
  interactionsOn: true,
};

const mutations = {
  [SIDEBAR_SWITCH_REQUEST](moduleState, payload) {
    moduleState.sidebarOpen = payload.sidebarOpen;
  },
  [TAB_SELECT_REQUEST](moduleState, payload) {
    moduleState.activeTabNumber = payload.activeTabNumber;
  },
  [INTERACTIONS_ON_TOGGLE](moduleState) {
    moduleState.interactionsOn = !moduleState.interactionsOn;
  },
};

const actions = {
  switchSidebar({ commit }, sidebarOpen) {
    commit(SIDEBAR_SWITCH_REQUEST, { sidebarOpen });
  },
  selectActiveTab({ commit }, activeTab) {
    commit(TAB_SELECT_REQUEST, { activeTabNumber: activeTab });
  },
  toggleInteractions({ commit }) {
    commit(INTERACTIONS_ON_TOGGLE);
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
