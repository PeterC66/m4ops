import {
  isDefined,
  join,
  newVoid,
  thisAndPrevious,
} from '../../../../global/utils';
import { tidyChosenLayers } from '../utils';
import { displayTypeEnum } from '../../../../global/constants';

import {
  INITIALISE_CHOSEN_LAYERS,
  LAYER_SET_REQUEST,
  OPACITY_SET_REQUEST,
  MOVE_LAYER_UP,
} from '../../../mutation-types';
import { initialStateChosenLayersByOpsCode }
  from '../../../../initialising/initialState';

const state = {
  chosenLayers: [],
};

const mutations = {
  [INITIALISE_CHOSEN_LAYERS](moduleState, payload) {
    const { opsCode } = payload;
    const arr1 = initialStateChosenLayersByOpsCode(opsCode);
    moduleState.chosenLayers.splice(
      0,
      moduleState.chosenLayers.length,
      ...arr1,
    );
  },
  [LAYER_SET_REQUEST](moduleState, payload) {
    const { ldid, layerNumber, displaytype } = payload;
    const arrayLength = moduleState.chosenLayers.length;
    if (isDefined(layerNumber)) {
      if (layerNumber < arrayLength) {
        let { opacity } = moduleState.chosenLayers[layerNumber];
        if (
          layerNumber === 0 ||
          displaytype === displayTypeEnum.mostlyVectors
        ) opacity = 1;
        // Use splice to ensure reactivity
        moduleState.chosenLayers.splice(
          layerNumber,
          1,
          {
            ldid: ldid || newVoid(),
            opacity,
            displaytype,
          },
        );
      } else {
        moduleState.chosenLayers.splice(
          arrayLength,
          0,
          {
            ldid: ldid || newVoid(),
            opacity: (
              layerNumber === 0 ||
              displaytype === displayTypeEnum.mostlyVectors
            ) ? 1 : 0.5,
            displaytype,
          },
        );
      }

      moduleState.chosenLayers = tidyChosenLayers(moduleState.chosenLayers);
      if (moduleState.chosenLayers.length) {
        moduleState.chosenLayers[0].opacity = 1; // in case not
      }
    } else {
      console.log('Warning: layerNumber is undefined'); // eslint-disable-line no-console
    }
  },
  [OPACITY_SET_REQUEST](moduleState, payload) {
    const { opacity, layerNumber } = payload;
    if (isDefined(layerNumber)) {
      if (moduleState.chosenLayers[layerNumber]) {
        if (isDefined(opacity)) {
          moduleState.chosenLayers[layerNumber].opacity = opacity;
        } else {
          // eslint-disable-next-line max-len, no-console
          console.log(`Warning: opacity is undefined for layerNumber: ${layerNumber}`);
        }
      } else {
        // eslint-disable-next-line max-len, no-console
        console.log(`Warning: defining opacity before ldid for layerNumber: ${layerNumber}`);
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
      if (pair[0].displaytype === pair[1].displaytype) {
        moduleState.chosenLayers.splice(
          layerNumber - 1,
          2,
          /* eslint-disable max-len */
          { ldid: pair[1].ldid, opacity: pair[0].opacity, displaytype: pair[1].displaytype },
          { ldid: pair[0].ldid, opacity: pair[1].opacity, displaytype: pair[0].displaytype },
          /* eslint-enable max-len */
        );
      } else {
        moduleState.chosenLayers.splice(
          layerNumber - 1,
          2,
          /* eslint-disable max-len */
          { ldid: pair[1].ldid, opacity: pair[1].opacity, displaytype: pair[1].displaytype },
          { ldid: pair[0].ldid, opacity: pair[0].opacity, displaytype: pair[0].displaytype },
          /* eslint-enable max-len */
        );
      }
      moduleState.chosenLayers = tidyChosenLayers(moduleState.chosenLayers);
    }
  },
};

const actions = {
  // payload is { opsCode: eg HcN }
  initialiseChosenLayers({ commit }, opsCode) {
    commit(INITIALISE_CHOSEN_LAYERS, { opsCode });
  },
  // payload is { ldid:string_index_into_LayerDefsArray, layerNumber: eg 0, displaytype: eg A }
  setLayer({ commit }, { ldid, layerNumber, displaytype }) {
    commit(LAYER_SET_REQUEST, { ldid, layerNumber, displaytype });
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
      rootGetters.OPSAllLayerDefsArray, //   lookupTable,
      moduleGetters.chosenLayersMainmap, // mainTable
      'ldid', // lookupKey
      'ldid', // mainKey
      false, // isInner, ie includes unmatched rows
      (mainTableRow, lookupTableRow) => ({ // select ie all columns of both
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
  displaytypeAsAbove(
    moduleState,
    moduleGetters,
  ) {
    const tandp = (thisAndPrevious(
      moduleGetters.chosenLayerDefsMainmap,
      'displaytype',
    ));
    return tandp.thisValue === tandp.previousValue;
  },
};

const mainmapModule = {
  state,
  mutations,
  actions,
  getters,
};

export default mainmapModule;
