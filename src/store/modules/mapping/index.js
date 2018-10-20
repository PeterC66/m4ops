import {
  UPDATE_MAP_DISPLAY,
  UPDATE_ACTION_ON_CLICK,
} from '../../mutation-types';

const state = {
  mapDisplay: 'overlay',
  actionOnClick: 'no',
  chosenLayers: [],
  // current map viewport (shared among all vuelayers instances)
  view: {
    ident: 'shared-view', // https://vuelayers.github.io/#/component/view?id=ident
    zoom: 7,
    center: [-105.8701, 34.5199],
    rotation: 0,
  },

};

const mutations = {
  [UPDATE_MAP_DISPLAY](moduleState, payload) {
    moduleState.mapDisplay = payload.mapDisplay;
  },
  [UPDATE_ACTION_ON_CLICK](moduleState, payload) {
    moduleState.actionOnClick = payload.actionOnClick;
  },
  updateViewZoom(moduleState, payload) {
    moduleState.view.zoom = payload.n;
  },
  updateViewCenter(moduleState, payload) {
    moduleState.view.center = payload.lnglat;
  },
  updateViewRotation(moduleState, payload) {
    moduleState.view.rotation = payload.rotation;
  },
};

const actions = {
  updateMapDisplay({ commit }, mapDisplay) {
    commit(UPDATE_MAP_DISPLAY, { mapDisplay });
  },
  updateActionOnClick({ commit }, actionOnClick) {
    commit(UPDATE_ACTION_ON_CLICK, { actionOnClick });
  },
  updateViewZoom({ commit }, n) {
    commit('updateViewZoom', { n });
  },
  updateViewCenter({ commit }, lnglat) {
    commit('updateViewCenter', { lnglat });
  },
  updateViewRotation({ commit }, rotation) {
    commit('updateViewRotation', { rotation });
  },
};

const getters = {
  mapDisplay: moduleState => moduleState.mapDisplay,
  actionOnClick: moduleState => moduleState.actionOnClick,
  viewZoom: moduleState => moduleState.view.zoom,
  viewCenter: moduleState => moduleState.view.center,
  viewRotation: moduleState => moduleState.view.rotation,
};

const mappingModule = {
  state,
  mutations,
  actions,
  getters,
};

export default mappingModule;
