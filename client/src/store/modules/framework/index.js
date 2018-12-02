import _ from 'lodash';

import {
  SIDEBAR_SWITCH_REQUEST,
  TAB_SELECT_REQUEST,
  INTERACTIONS_ON_TOGGLE,
  LOADING_START,
  LOADING_END,
} from '../../mutation-types';

const state = {
  sidebarOpen: true,
  activeTabNumber: 0,
  interactionsOn: true,
  loadingIds: [],
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
  [LOADING_START](moduleState, payload) {
    const { loadingId } = payload;
    const arrayLengthOld = moduleState.loadingIds.length;
    moduleState.loadingIds.splice(
      moduleState.loadingIds.length,
      0,
      loadingId,
    );
    const arrayLengthNew = moduleState.loadingIds.length;
    if (arrayLengthNew !== arrayLengthOld + 1) {
      // eslint-disable-next-line no-console
      console.log('Problem with loadingIds', moduleState.loadingIds);
    }
  },
  [LOADING_END](moduleState, payload) {
    const { loadingId } = payload;
    const arrayLengthOld = moduleState.loadingIds.length;
    moduleState.loadingIds = _.without(moduleState.loadingIds, loadingId);
    const arrayLengthNew = moduleState.loadingIds.length;
    if (arrayLengthNew !== arrayLengthOld - 1) {
      // eslint-disable-next-line no-console
      console.log('Problem with loadingIds', moduleState.loadingIds);
    }
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
  startLoading({ commit }, loadingId) {
    commit(LOADING_START, { loadingId });
  },
  endLoading({ commit }, loadingId) {
    commit(LOADING_END, { loadingId });
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
