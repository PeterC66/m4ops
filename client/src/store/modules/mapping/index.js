import { isDefined } from '../../../global/utils';
import mainmap from './mainmap';

import {
  UPDATE_MAP_DISPLAY,
  UPDATE_ACTION_ON_CLICK,
  UPDATE_VIEW,
  UPDATE_CURRENT_OPTION_ARRAY,
  RH_LAYER_SET_REQUEST,
} from '../../mutation-types';
import {
  initialCurrentOptionArray,
  initialStateRhChosenLayer,
} from '../../../initialising/initialState';

const state = {
  mapDisplay: 'overlay',
  actionOnClick: 'select',
  // current map viewport (shared among all vuelayers instances)
  // Note this does not persist if useVuexForView is false
  view: {
    ident: 'shared-view', // https://vuelayers.github.io/#/component/view?id=ident
    zoom: 7,
    center: [-105.8701, 34.5199],
    rotation: 0,
  },
  currentOptionArray: initialCurrentOptionArray,
  chosenRhLayer: initialStateRhChosenLayer,
};

const mutations = {
  [UPDATE_MAP_DISPLAY](moduleState, payload) {
    moduleState.mapDisplay = payload.mapDisplay;
  },
  [UPDATE_ACTION_ON_CLICK](moduleState, payload) {
    moduleState.actionOnClick = payload.actionOnClick;
  },
  [UPDATE_VIEW](moduleState, payload) {
    const { zoom } = payload;
    if (isDefined(zoom)) { moduleState.view.zoom = zoom; }
    const { center } = payload;
    if (isDefined(center)) {
      if (center.length === 2) {
        moduleState.view.center = center;
      } else {
        console.log('Warning: center is ', center); // eslint-disable-line no-console
      }
    }
    const { rotation } = payload;
    if (isDefined(rotation)) { moduleState.view.rotation = rotation; }
  },
  [UPDATE_CURRENT_OPTION_ARRAY](moduleState, payload) {
    moduleState.currentOptionArray = payload.currentOptionArray;
  },
  [RH_LAYER_SET_REQUEST](moduleState, payload) {
    moduleState.chosenRhLayer = payload.chosenRhLayer;
  },
};

const actions = {
  updateMapDisplay({ commit }, mapDisplay) {
    commit(UPDATE_MAP_DISPLAY, { mapDisplay });
  },
  updateActionOnClick({ commit }, actionOnClick) {
    commit(UPDATE_ACTION_ON_CLICK, { actionOnClick });
  },
  updateViewZoom({ commit }, zoom) {
    commit(UPDATE_VIEW, { zoom: zoom || 15 });
  },
  updateViewCenter({ commit }, center) {
    commit(UPDATE_VIEW, { center });
  },
  updateViewRotation({ commit }, rotation) {
    commit(UPDATE_VIEW, { rotation: rotation || 0 });
  },
  updateView({ commit }, view) {
    commit(UPDATE_VIEW, { ...view });
  },
  updateCurrentOptionArray({ commit }, currentOptionArray) {
    commit(UPDATE_CURRENT_OPTION_ARRAY, { currentOptionArray });
  },
  // payload is { ldid:string_index_into_LayerDefsArray }
  setRhLayer({ commit }, { ldid }) {
    commit(RH_LAYER_SET_REQUEST, { chosenRhLayer: ldid });
  },
};

const getters = {
};

const mappingModule = {
  modules: {
    mainmap,
  },
  state,
  mutations,
  actions,
  getters,
};

export default mappingModule;
