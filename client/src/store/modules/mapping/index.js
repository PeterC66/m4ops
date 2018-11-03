import { isDefined } from '../../../global/utils';
import mainmap from './mainmap';

import {
  UPDATE_MAP_DISPLAY,
  UPDATE_ACTION_ON_CLICK,
  UPDATE_VIEW,
} from '../../mutation-types';

const state = {
  mapDisplay: 'overlay',
  actionOnClick: 'no',
  // current map viewport (shared among all vuelayers instances)
  // Note this does not persist if useVuexForView is false
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
  [UPDATE_VIEW](moduleState, payload) {
    const { zoom } = payload;
    if (isDefined(zoom)) { moduleState.view.zoom = zoom; }
    const { center } = payload;
    if (isDefined(center)) {
      if (center.length === 2) {
        moduleState.view.center = center;
      } else {
        console.log('Warning: center is ', center);
      }
    }
    const { rotation } = payload;
    if (isDefined(rotation)) { moduleState.view.rotation = rotation; }
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
