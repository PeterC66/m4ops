import _ from 'lodash';

import {
  isDefined,
  join,
  isVoid,
  newVoid,
} from '../../../../global/utils';

import {
  LAYER_SET_REQUEST,
  OPACITY_SET_REQUEST,
  MOVE_LAYER_UP,
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
    const arrayLength = moduleState.chosenLayers.length;
    if (isDefined(layerNumber)) {
      if (layerNumber < arrayLength) {
        const { opacity } = moduleState.chosenLayers[layerNumber];
        // Use splice to ensure reactivity
        moduleState.chosenLayers.splice(
          layerNumber,
          1,
          { ldid: ldid || newVoid(), opacity },
        );
      } else {
        moduleState.chosenLayers.splice(
          arrayLength,
          0,
          { ldid: ldid || newVoid(), opacity: layerNumber === 0 ? 1 : 0.5 },
        );
      }

      // Next line uses _.BaseSlice, which does an array replace
      moduleState.chosenLayers =
        _.dropRightWhile(
          moduleState.chosenLayers,
          value => isVoid(value.ldid),
        );
    } else {
      console.log('Warning: layerNumber is undefined');
    }
  },
  [OPACITY_SET_REQUEST](moduleState, payload) {
    const { opacity, layerNumber } = payload;
    if (isDefined(layerNumber)) {
      if (moduleState.chosenLayers[layerNumber]) {
        if (isDefined(opacity)) {
          moduleState.chosenLayers[layerNumber].opacity = opacity;
        } else {
          console.log(`Warning: opacity is undefined
            for layerNumber: ${layerNumber}`);
        }
      } else {
        console.log(`Warning: defining opacity
          before ldid for layerNumber: ${layerNumber}`);
      }
    }
  },
  [MOVE_LAYER_UP](moduleState, payload) {
    const { layerNumber } = payload;
    if (layerNumber) {
      const pair = [
        moduleState.chosenLayers[layerNumber - 1],
        moduleState.chosenLayers[layerNumber],
      ];
      moduleState.chosenLayers.splice(
        layerNumber - 1,
        2,
        { ldid: pair[1].ldid, opacity: pair[0].opacity },
        { ldid: pair[0].ldid, opacity: pair[1].opacity },
      );

      moduleState.chosenLayers =
        _.dropRightWhile(
          moduleState.chosenLayers,
          value => isVoid(value.ldid),
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
  // payload is {opacity: eg 0.5, layerNumber: eg 0}
  setOpacity({ commit }, { opacity, layerNumber }) {
    commit(OPACITY_SET_REQUEST, { opacity, layerNumber });
  },
  // payload is {layerNumber: eg 1}
  moveLayerUp({ commit }, { layerNumber }) {
    commit(MOVE_LAYER_UP, { layerNumber });
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
