import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import _ from 'lodash';
import OlMap from 'ol/map';

import reducerRegistry from '../../store/reducerRegistry';
// import { updateItemInArray } from '../../global/reducerUtils';
import { isDefined, createNamedSelector } from '../../global/utils';
import { initialStateChosenLayers } from './overall/initialState';
import { isLayerDefined } from './utils/mapUtils';
import { layerFromDef } from './layerhandling/layerFromDef';

// Assign the name for prefixing actions etc
const reducerName = 'mapping';

const createActionName = name => `app/${reducerName}/${name}`;

// ACTION CREATORS

// export const setupMap = createAction(createActionName('MAP_SETUP'));
// payload is {ldId:string_index_into_LayerDefsArray, layerNumber: eg 0}
export const setLayerRequest = createAction(createActionName('LAYER_SET_REQUEST'));

// Initial State
const initialState = {
  chosenlayers: initialStateChosenLayers,
};

// REDUCERS

// Note that because of combinedReducer all mapping actions have
// a LayerDefs property (from OPSDetails) that can be used here

const value = handleActions({
  [setLayerRequest]: {
    next: (state, action) => {
      const { LayerDefs } = action;
      const nextMainMap = _.cloneDeep(state.mainmap);
      // for payload see above {ldId:string_index_into_LayerDefsArray, layerNumber: eg 0}
      const layerindex = action.payload.layerNumber;
      if (!isDefined(action.payload.ldId)) { // indicating to delete the layer
        nextMainMap.getLayers().removeAt(layerindex);
      } else {
        if (isLayerDefined(nextMainMap, layerindex)) {
          nextMainMap.getLayers().removeAt(layerindex);
        }
        const layerToInsert = layerFromDef(LayerDefs, action.payload.ldId);
        nextMainMap.getLayers().insertAt(layerindex, layerToInsert);
      }
      return {
        ...state,
        mainmap: nextMainMap,
      };
    },
  },
}, initialState);

const error = handleActions({
  [setLayerRequest]: {
    next: state => ({ ...state }),
    throw: (state, action) => ({
      ...state,
      chosenLayers: action.payload.message,
    }),
  },
}, null);

const reducer = combineReducers({
  error,
  value,
});
export default reducer;

// Register the reducer

// reducerRegistry.register(reducerName, reducer);

// SELECTORS

export const getAllMapping = state => (state[reducerName] || {}).value || {};
getAllMapping.reportingName = 'getAllMapping';

// Non Redux Selectors - their arguments are NOT state

export const getMainmapFromMap = (map) => {
  if (isDefined(map) && (map instanceof OlMap)) {
    return map;
  }
  console.log('getMainmapFromMap called with invalid map:', map); // eslint-disable-line no-console
  return {};
};
getMainmapFromMap.reportingName = 'getMainmap';

export const getChosenLayersFromMap = createNamedSelector(
  'getChosenLayersFromMap',
  getMainmapFromMap,
  (map) => {
    if (isDefined(map) && (map instanceof OlMap)) {
      const layersArray = map.getLayers().getArray();
      return layersArray.map((item, index) => ({
        layerNumber: index,
        ldId: item.get('ldId'),
      }));
    }
    console.log('getChosenLayersFromMap called with invalid map:', map); // eslint-disable-line no-console
    return [];
  },
);
