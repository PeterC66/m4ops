import { isDefined } from '../../../../global/utils';

import { LAYER_SET_REQUEST } from '../../../mutation-types';
import { initialStateChosenLayers }
  from '../../../../initialising/initialState';

const state = {
  chosenLdids: initialStateChosenLayers,
};

const mutations = {
  [LAYER_SET_REQUEST](moduleState, payload) {
    const { ldId, layerNumber } = payload;
    if (isDefined(layerNumber)) {
      moduleState.chosenLdids[layerNumber] = ldId || 'void';
    }
  },
};

const actions = {
// payload is {ldId:string_index_into_LayerDefsArray, layerNumber: eg 0}
  setLayer({ commit }, ldId, layerNumber) {
    commit(LAYER_SET_REQUEST, { ldId, layerNumber });
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
