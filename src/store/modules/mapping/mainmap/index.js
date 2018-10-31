import _ from 'lodash';

import { isDefined, join } from '../../../../global/utils';
import { voidLdid } from '../../../../global/constants';

import {
  LAYER_SET_REQUEST,
  OPACITY_SET_REQUEST,
} from '../../../mutation-types';
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
          opacity: layerNumber === 0 ? 1 : 0.5,
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
  [OPACITY_SET_REQUEST](moduleState, payload) {
    const { opacity, layerNumber } = payload;
    if (isDefined(layerNumber)) {
      if (moduleState.chosenLayers[layerNumber]) {
        if (isDefined(opacity)) {
          moduleState.chosenLayers[layerNumber].opacity = opacity;
        } else {
          moduleState.chosenLayers[layerNumber].opacity = voidLdid;
        }
      } else {
        console.log(`Warning:
          defining opacity before ldid for layerNumber: ${layerNumber}`);
      }
    }
  },
};

const actions = {
  // payload is {ldid:string_index_into_LayerDefsArray, layerNumber: eg 0}
  setLayer({ commit }, { ldid, layerNumber }) {
    console.log('setLayer', ldid, layerNumber);
    commit(LAYER_SET_REQUEST, { ldid, layerNumber });
  },
  // payload is {opacity: eg 0.5, layerNumber: eg 0}
  setOpacity({ commit }, { opacity, layerNumber }) {
    commit(OPACITY_SET_REQUEST, { opacity, layerNumber });
  },
};

const getters = {
  chosenLayersMainmap: moduleState => moduleState.chosenLayers || [],
  chosenLayerDefsMainmap(
    moduleState,
    moduleGetters,
    rootState,
    rootGetters,
  ) {
    return join(
      rootGetters.OPSAllLayerDefsArray,
      moduleGetters.chosenLayersMainmap,
      'ldid',
      'ldid',
      false, // so includes unmatched rows
      (mainTableRow, lookupTableRow) => ({
        ...mainTableRow,
        ...lookupTableRow,
      }),
    ).sort((a, b) => {
      const x = a.layerNumber;
      const y = b.layerNumber;
      if (!x) { return -1; }
      if (!y) { return 1; }
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
  },
};

const mainmapModule = {
  state,
  mutations,
  actions,
  getters,
};

export default mainmapModule;
