import { isDefined } from '../../../../global/utils';

import { LAYER_SET_REQUEST } from '../../../mutation-types';
import { initialStateChosenLayers } from '../../../../initialising/initialState';

const state = {
  chosenLdids: initialStateChosenLayers,
};

const mutations = {
  [LAYER_SET_REQUEST](moduleState, payload) {
    const { ldid, layerNumber } = payload;
    if (isDefined(layerNumber)) {
      if (!isDefined(ldid)) { // indicating to delete the layer
      }
    }
    moduleState.chosenLdids = payload.mapDisplay;
  }
};

/*

const value = handleActions({
  [setLayerRequest]: {
    next: (state, action) => {
      const { LayerDefs } = action;
      const nextMainMap = _.cloneDeep(state.mainmap);
      // for payload see above {ldid:string_index_into_LayerDefsArray, layerNumber: eg 0}
      const layerindex = action.payload.layerNumber;
      if (!isDefined(action.payload.ldid)) { // indicating to delete the layer
        nextMainMap.getLayers().removeAt(layerindex);
      } else {
        if (isLayerDefined(nextMainMap, layerindex)) {
          nextMainMap.getLayers().removeAt(layerindex);
        }
        const layerToInsert = layerFromDef(LayerDefs, action.payload.ldid);
        nextMainMap.getLayers().insertAt(layerindex, layerToInsert);
      }
      return {
        ...state,
        mainmap: nextMainMap,
      };
    },
  },
}, initialState);

*/

const actions = {
// payload is {ldid:string_index_into_LayerDefsArray, layerNumber: eg 0}
  setLayer({ commit }, ldid, layerNumber) {
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
