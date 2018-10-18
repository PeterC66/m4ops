import {
  UPDATE_MAP_DISPLAY,
  UPDATE_ACTION_ON_CLICK,
} from '../../mutation-types';

const state = {
  mapDisplay: 'overlay',
  actionOnClick: 'no',
};

const mutations = {
  [UPDATE_MAP_DISPLAY](moduleState, payload) {
    moduleState.mapDisplay = payload.mapDisplay;
  },
  [UPDATE_ACTION_ON_CLICK](moduleState, payload) {
    moduleState.actionOnClick = payload.actionOnClick;
  },
};

const actions = {
  updateMapDisplay({ commit }, mapDisplay) {
    commit(UPDATE_MAP_DISPLAY, { mapDisplay });
  },
  updateActionOnClick({ commit }, actionOnClick) {
    commit(UPDATE_ACTION_ON_CLICK, { actionOnClick });
  },
};

const getters = {
  mapDisplay: moduleState => moduleState.mapDisplay,
  actionOnClick: moduleState => moduleState.actionOnClick,
};

const mappingModule = {
  state,
  mutations,
  actions,
  getters,
};

export default mappingModule;
