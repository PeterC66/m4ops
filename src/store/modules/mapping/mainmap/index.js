import _ from 'lodash';

import { isDefined } from '../../../../global/utils';
import { voidLdid } from '../../../../global/constants';

import { LAYER_SET_REQUEST } from '../../../mutation-types';
import { initialStateChosenLayers }
  from '../../../../initialising/initialState';

const state = {
  // chosenLdids: initialStateChosenLayers,
  chosenLayers: initialStateChosenLayers,
};

const mutations = {
  [LAYER_SET_REQUEST](moduleState, payload) {
    const { ldid, layerNumber } = payload;
    if (isDefined(layerNumber)) {
      if (moduleState.chosenLayers[layerNumber]) {
        moduleState.chosenLayers[layerNumber].ldid = ldid || voidLdid;
      } else {
        moduleState.chosenLayers[layerNumber] = {
          ldid: ldid || voidLdid,
          opacity: 0.5,
        };
      }
      // Next line has by-product of making it reactive
      moduleState.chosenLayers =
        _.dropRightWhile(
          moduleState.chosenLayers,
          value => value.ldid === voidLdid,
        );
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
  chosenLayersMainmap: moduleState => moduleState.chosenLayers || [],
  // chosenLdidsMainmap: moduleState => moduleState.chosenLdids || [],
};

const mainmapModule = {
  state,
  mutations,
  actions,
  getters,
};

export default mainmapModule;
