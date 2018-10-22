// import { createAction, handleActions } from 'redux-actions';
// import { combineReducers } from 'redux';
// import { createSelector } from 'reselect';
// import cuid from 'cuid';
// import _ from 'lodash';

// import reducerRegistry from '../../store/reducerRegistry';
// import { updateItemInArray } from '../../global/reducerUtils';
// import { isDefined } from '../../global/utils';
// import { initialStateMainMap } from './overall/initialState';

// // Assign the name for prefixing actions etc
// const reducerName = 'mapping';

// const createActionName = name => `app/${reducerName}/${name}`;

// // ACTION CREATORS

// // export const setupMap = createAction(createActionName('MAP_SETUP'));
// // payload is {ldId:string_index_into_LayerDefsArray, layerNumber: eg 0}
// export const setLayerRequest = createAction(createActionName('LAYER_SET_REQUEST'));

// // Initial State
// const initialState = {
//   mainmap: initialStateMainMap,
//   // See Map.jsx to tie in
//   // chosenLayers: [{ cuidKey: 'xxx', ldId: 'World>Basic>OpenStreetMap', originalIndex: null }],
// };

// // REDUCERS

// // export const getMainmapTemp = state => state[reducerName].value.mainmap;

// const value = handleActions({
//   // [setupMap]: {
//   //   next: (state, action) => ({
//   //     ...state,
//   //     mainmap: action.payload.map,
//   //   }),
//   // },
//   [setLayerRequest]: {
//     next: (state, action) => {
//       const nextLayers = _.filter(
//         updateItemInArray(
//           state.chosenLayers,
//           action.payload.layerNumber,
//           () => ({ ldId: action.payload.ldId, cuidKey: cuid(), originalIndex: null }),
//           true,
//         ),
//         v => isDefined(v.ldId),
//       );
//       return {
//         ...state,
//         chosenLayers: nextLayers,
//         /*         mainmap: loadLayers(
//           getMainmapTemp(state),
//           nextLayers,
//           getOPSAllLayerDefsArray(state),
//         ),
//  */
//       };
//     },
//   },
// }, initialState);

// /*
// case setLayerRequest.toString():
// // If any chosenLayers have changed load them into the map
// loadLayers(
//   getMainmap(nextState),
//   getChosenLayers(prevState),
//   getChosenLayers(nextState),
//   getLayerDefs(nextState),
// );
// break; */


// /*
// chosenLayers: _.remove(updateItemInArray(
//   state.chosenLayers,
//   action.payload.layerNumber,
//   () => ({ ldId: action.payload.ldId, cuidKey: cuid(), originalIndex: null }),
//   true,
// ), (v) => { console.log('RED', v, !isDefined(v.ldId)); return false; }),
// }),
// },
// }, initialState); */

// const error = handleActions({
//   [setupMap]: {
//     next: state => ({ ...state }),
//     throw: (state, action) => ({
//       ...state,
//       mainmap: action.payload.message,
//     }),
//   },
//   [setLayerRequest]: {
//     next: state => ({ ...state }),
//     throw: (state, action) => ({
//       ...state,
//       chosenLayers: action.payload.message,
//     }),
//   },
// }, null);

// const reducer = combineReducers({
//   error,
//   value,
// });
// export default reducer;

// // Register the reducer

// reducerRegistry.register(reducerName, reducer);

// // SELECTORS

// export const getAllMapping = state => state[reducerName].value;

// export const getMainmap = createSelector(
//   getAllMapping,
//   v => v.mainmap,
// );

// export const getChosenLayers = createSelector(
//   getAllMapping,
//   v => v.chosenLayers,
// );
