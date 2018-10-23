import _ from 'lodash';

import { isDefined } from '../../../../global/utils';
import { voidLdid } from '../../../../global/constants';

import { LAYER_SET_REQUEST } from '../../../mutation-types';
import { initialStateChosenLayers }
  from '../../../../initialising/initialState';

const state = {
  chosenLdids: initialStateChosenLayers,
};

const mutations = {
  [LAYER_SET_REQUEST](moduleState, payload) {
    const { ldid, layerNumber } = payload;
    if (isDefined(layerNumber)) {
      moduleState.chosenLdids[layerNumber] = ldid || voidLdid;
      // Next line has by-product of making it reactive
      moduleState.chosenLdids =
        _.dropRightWhile(moduleState.chosenLdids, value => value === voidLdid);
    }
  },
};

const actions = {
// payload is {ldid:string_index_into_LayerDefsArray, layerNumber: eg 0}
  setLayer({ commit }, { ldid, layerNumber }) {
    console.log('setLayer', ldid, layerNumber);
    commit(LAYER_SET_REQUEST, { ldid, layerNumber });
  },
};

const getters = {
  chosenLdidsMainmap: moduleState => moduleState.chosenLdids || [],
};

const mainmapModule = {
  state,
  mutations,
  actions,
  getters,
};

export default mainmapModule;
