import {
  SIDEBAR_SWITCH_REQUEST,
  TAB_SELECT_REQUEST,
  CHOOSE_OPS_STATE_REQUEST,
} from '../../mutation-types';

const state = {
  sidebarOpen: true,
  activeTabName: 'actions',
  chooseOPSOpen: false,
};

const mutations = {
  [SIDEBAR_SWITCH_REQUEST](moduleState, payload) {
    moduleState.sidebarOpen = payload.sidebarOpen;
  },
  [TAB_SELECT_REQUEST](moduleState, payload) {
    moduleState.activeTabName = payload.activeTabName;
  },
  [CHOOSE_OPS_STATE_REQUEST](moduleState, payload) {
    moduleState.chooseOPSOpen = payload.chooseOPSOpen;
  },
};

const actions = {
  switchSidebar({ commit }, sidebarOpen) {
    commit(SIDEBAR_SWITCH_REQUEST, { sidebarOpen });
  },
  selectActiveTab({ commit }, activeTab) {
    commit(TAB_SELECT_REQUEST, { activeTabName: activeTab.name });
  },
  setChooseOPS({ commit }, chooseOPSOpen) {
    commit(CHOOSE_OPS_STATE_REQUEST, { chooseOPSOpen });
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
