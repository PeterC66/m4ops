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
    const { ldid, layerNumber, displayType } = payload;
    const arrayLength = moduleState.chosenLayers.length;
    if (isDefined(layerNumber)) {
      if (layerNumber < arrayLength) {
        const { opacity } = moduleState.chosenLayers[layerNumber];
        // Use splice to ensure reactivity
        moduleState.chosenLayers.splice(
          layerNumber,
          1,
          {
            ldid: ldid || newVoid(),
            opacity,
            displayType,
          },
        );
      } else {
        moduleState.chosenLayers.splice(
          arrayLength,
          0,
          {
            ldid: ldid || newVoid(),
            opacity: (layerNumber === 0 || displayType === 'B') ? 1 : 0.5,
            displayType,
          },
        );
      }

      moduleState.chosenLayers =
        _.sortBy(
          _.filter(
            moduleState.chosenLayers,
            value => !isVoid(value.ldid),
          ),
          'displayType',
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
        /* eslint-disable max-len */
        { ldid: pair[1].ldid, opacity: pair[0].opacity, displayType: pair[1].displayType },
        { ldid: pair[0].ldid, opacity: pair[1].opacity, displayType: pair[0].displayType },
        /* eslint-enable max-len */
      );

      moduleState.chosenLayers =
        _.sortBy(
          _.filter(
            moduleState.chosenLayers,
            value => !isVoid(value.ldid),
          ),
          'displayType',
        );
      // moduleState.chosenLayers =
      //   _.dropRightWhile(
      //     moduleState.chosenLayers,
      //     value => isVoid(value.ldid),
      //   );
    }
  },
};

const actions = {
  // payload is { ldid:string_index_into_LayerDefsArray, layerNumber: eg 0, displayType: eg A }
  setLayer({ commit }, { ldid, layerNumber, displayType }) {
    console.log('setLayer', ldid, layerNumber, displayType);
    commit(LAYER_SET_REQUEST, { ldid, layerNumber, displayType });
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
