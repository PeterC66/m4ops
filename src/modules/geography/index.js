import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import _ from 'lodash';

import reducerRegistry from '../../store/reducerRegistry';
import {
  pipe,
  string2bool,
  isNotExcluded,
  createNamedSelector,
  isDefined,
} from '../../global/utils';

// Assign the name for prefixing actions, registering with the reducer register,
//   and use in selectors - dividing up the store
// This is a slice reducer, with access only to its bit of state -
// except where dealt with in our combinedReducer module

const reducerName = 'geography';

const createActionName = name => `app/${reducerName}/${name}`;

// ACTION CREATORS

/**
 *--------------------------------------------------
 * https://redux-actions.js.org/api/createaction#createactiontype-payloadcreator
 * param 1 = the action type
 * param 2 = (optional) is a payloadCreator function (default is identity)
 *
 * When we pass an action type into the createAction function,
 *  a function that accepts our value as the payload is returned back to us.
 *
 * The function payloadCreator, if required, is used to transform the raw input
 *  into data that is properly formatted as we want it to be, and could include error-checking.
 *--------------------------------------------------
 */
/**
 *--------------------------------------------------
 * An action creator created from createAction supports error objects as parameters
 *  (in addition to setting the payload to the error,
 *   it automatically sets the action’s error key to true).
 *
 *  (optional) postfix: REQUEST to initiate action, RESPONSE to deal with the response
 *  action name: <NOUN>_<VERB>_<POSTFIX> - using present tense
 *  action creator name: <verb><Noun>_<Postfix>
 *--------------------------------------------------
 */
/**
 * These action creators (simple and complex) are exported as functions, as needed
 * The action types are all in the form app/reducername/ACTION_NAME
 *   where action name (in UPPER_SNAKE_CASE) = <NOUN>_<VERB>_<POSTFIX> - using present tense
 *   and the optional postfix = REQUEST (to initiate action) or
 *   RESPONSE (to deal with the response - either value or error)
 * The action creator names correspond, but are <verb><Noun><Postfix>
 * (note that we have no separate Success/Failure actions, they are handled via errors)
 *
 * Note that if an action type is needed elsewhere, use actionCreatorName.toString()
 * although below we use [actionCreatorName] per https://codeburst.io/redux-actions-through-example-part-1-f5b2dc71de06
 * The square brackets is the ES2015 computed property feature (which calls the toString method)
 */

export const fetchContinentsResponse = createAction(createActionName('CONTINENTS_FETCH_RESPONSE'));
export const fetchPlaceResponse = createAction(createActionName('PLACE_FETCH_RESPONSE'));
export const fetchM4OPSResponse = createAction(createActionName('M4OPSDATA_FETCH_RESPONSE'));

export const fetchContinents = () => dispatch => fetch('/continents')
  .then(response => response.json())
  .then(data => dispatch(fetchContinentsResponse(data.data)))
  .catch(e => console.log(e)); // eslint-disable-line no-console

export const fetchPlace = opscode => dispatch => fetch(`/places/${opscode}`)
  .then(response => response.json())
  .then(data => dispatch(fetchPlaceResponse(data.data)))
  .catch(e => console.log(e)); // eslint-disable-line no-console

export const fetchM4OPSData = () => dispatch => fetch('/m4opsdata')
  .then(response => response.json())
  .then(data => dispatch(fetchM4OPSResponse(data.data)))
  .catch(e => console.log(e)); // eslint-disable-line no-console

// Initial State - is set the first time any reducer is used
const initialState = {
  place: { OPSCode: 'HcN', OPSName: 'Holywell-cum-Needingworth' },
  continents: [],
  m4opsdata: {},
};


// REDUCERS

// This uses the reducerMap form of handleActions
const value = handleActions({
  [fetchContinentsResponse]: {
    next: (state, action) => ({
      ...state,
      continents: action.payload,
    }),
    // there is no throw here
  },
  [fetchPlaceResponse]: {
    next: (state, action) => ({
      ...state,
      place: action.payload,
    }),
  },
  [fetchM4OPSResponse]: {
    next: (state, action) => ({
      ...state,
      m4opsdata: action.payload,
    }),
  },
}, initialState);

const error = handleActions({
  [fetchContinentsResponse]: {
    next: state => ({ ...state }),
    throw: (state, action) => ({
      ...state,
      continents: action.payload.message,
    }),
  },
  [fetchPlaceResponse]: {
    next: state => ({ ...state }),
    throw: (state, action) => ({
      ...state,
      place: action.payload.message,
    }),
  },
  [fetchM4OPSResponse]: {
    next: state => ({ ...state }),
    throw: (state, action) => ({
      ...state,
      m4opsdata: action.payload.message,
    }),
  },
}, null);

// It is essential a duck default exports a function called reducer()
const reducer = combineReducers({
  error,
  value,
});
export default reducer;

// Register the reducer - see ReducerRegistry.js for reference
reducerRegistry.register(reducerName, reducer);

// SELECTORS

/**
 *--------------------------------------------------
 * Selectors are pure functions that take the Redux state as argument
 *  and return some transformation over it.
 * In our method, every time anyone needs to access part of the state (like in mapStatetoProps),
 *  they need to go through a selector.
 *
 * selector name: get<Noun>
 *--------------------------------------------------
 */

// There is always one selector that returns the whole section of the data for this subsystem
// All other selectors are reselected from this - and hence memoized

export const getAllGeography = state => (state[reducerName] || {}).value || {};
getAllGeography.reportingName = 'getAllGeography';

// simple selectors do not transform the data they select.

// m4opsdata ========================================================
export const getM4OPSData = createNamedSelector(
  'getM4OPSData',
  getAllGeography,
  v => v.m4opsdata || {},
);

export const getWorldLayerDefsArray = createNamedSelector(
  'getWorldLayerDefsArray',
  getM4OPSData,
  m4opsdata => m4opsdata.WorldLayerDefsArray || [],
);

export const getDefinedLayerDefsArray = createNamedSelector(
  'getDefinedLayerDefsArray',
  getM4OPSData,
  m4opsdata => m4opsdata.DefinedLayerDefsArray || [],
);

export const getAreasArray = createNamedSelector(
  'getAreasArray',
  getM4OPSData,
  m4opsdata => m4opsdata.AreasArray || [],
);

export const getTextConversionsArray = createNamedSelector(
  'getTextConversionsArray',
  getM4OPSData,
  m4opsdata => m4opsdata.TextConversionsArray || [],
);

export const getAbbreviationsArray = createNamedSelector(
  'getAbbreviationsArray',
  getM4OPSData,
  m4opsdata => m4opsdata.AbbreviationsArray || [],
);

export const getToAbbreviateArray = createNamedSelector(
  'getToAbbreviateArray',
  getM4OPSData,
  m4opsdata => m4opsdata.toAbbreviateArray || [],
);

export const getDefaultColourSetsArray = createNamedSelector(
  'getDefaultColourSetsArray',
  getM4OPSData,
  m4opsdata => m4opsdata.DefaultColourSetsArray || [],
);

export const getShowLevels = createNamedSelector(
  'getShowLevels',
  getM4OPSData,
  m4opsdata => m4opsdata.showlevels || [],
);

export const getDemoSections = createNamedSelector(
  'getDemoSections',
  getM4OPSData,
  m4opsdata => m4opsdata.demoSections || [],
);

export const getHelp = createNamedSelector(
  'getHelp',
  getM4OPSData,
  m4opsdata => m4opsdata.HelpHTML || '',
);

// Place ========================================================
export const getPlace = createNamedSelector(
  'getPlace',
  getAllGeography,
  v => v.place || {},
);

export const getOPSLayerDefsArray = createNamedSelector(
  'getOPSLayerDefsArray',
  getPlace,
  place => place.LayerDefsArray || [],
);

// Continents ========================================================
export const getContinents = createNamedSelector(
  'getContinents',
  getAllGeography,
  v => v.continents || [],
);


/**
 *--------------------------------------------------
 * more complex selectors do some transforms
 * They may need special logic to avoid errors from undefineds
 *  (especially before all data has been loaded)
 *--------------------------------------------------
 */

// the Area the place is in
export const getArea = createNamedSelector(
  'getArea',
  [getAreasArray, getPlace],
  (areasArray, place) => (areasArray ? areasArray
    .filter(area => (area.AreaCode === place.Area))[0] // should just be the one
    : {}),
);

// the LayerDefs from the Area the place is in
export const getAreaLayerDefsArray = createNamedSelector(
  'getAreaLayerDefsArray',
  [getArea],
  area => (area && area.LayerDefsArray ? area.LayerDefsArray : []),
);

// the (common) DefinedLayers from the Area the place is in
export const getAreaDefinedLayerDefsArray = createNamedSelector(
  'getAreaDefinedLayerDefsArray',
  [getArea, getDefinedLayerDefsArray],
  (area, DefinedLayerDefs) => {
    if (
      !isDefined(area)
      || !isDefined(DefinedLayerDefs)
      || !isDefined(area.AreaLayerDefs)
    ) return [];
    return DefinedLayerDefs.filter(ld => _.includes((area.AreaLayerDefs), ld.title));
  },
);

/**
 *--------------------------------------------------
 * We want to include (concat) the LayerDefs from
 *  - getWorldLayerDefsArray
 *  - getAreaLayerDefsArray
 *  - getAreaDefinedLayerDefsArray
 *  - getOPSLayerDefsArray
 *
 *TODO
 * and  if (layerDefs[ldindex].date == "THISYEAR") layerDefs[ldindex].date = thisYear();
 * and  getTheExtrasFile(ldindex);   getTheXRefsFile(ldindex);
 * and  The asynch call to processALayerDef for the WMTS layerDefs is now called last
 *
 *--------------------------------------------------
 */

export const getLayerDefsArrayBeforeExclusions = createNamedSelector(
  'getLayerDefsArrayBeforeExclusions',
  [
    () => [], // so concat always has a valid array
    getWorldLayerDefsArray,
    getAreaLayerDefsArray,
    getAreaDefinedLayerDefsArray,
    getOPSLayerDefsArray,
  ],
  (a, b, c, d, e) => a.concat(b, c, d, e),
);

// Finally we need to exclude certain LayerDefs
export const getOPSAllLayerDefsArray = createNamedSelector(
  'getOPSAllLayerDefsArray',
  [getLayerDefsArrayBeforeExclusions, getPlace],
  (fullArray, place) => (fullArray || [])
    .filter(ld => (isNotExcluded(ld, (place || {}).ExclusionsArray))),
);

/**
 *--------------------------------------------------
 * getCategoriesAndLayers takes an array of LayerDefs and returns a two level array
 * of Layers within Categories, to be the options object (array) for a cascader.
 * Only layers of given types are included, and any with donotshow set to TRUE are excluded.
 *--------------------------------------------------
 */
const layertypesGiven = ['Tile', 'VectorTile', 'WMS', 'WMTS', 'Group', 'Series', 'Vector'];

const extractCategories = pipe(
  arr => arr.filter(ld => (ld ? !string2bool(ld.donotshow, false) : false)),
  arr => arr.filter(ld => (ld ? (layertypesGiven.indexOf(ld.layertype) !== -1) : false)),
  arr => _.uniqBy(arr, 'category'),
);

const categoriesAndLayers = (lds) => {
  if (!lds) return [];
  const categories = extractCategories(lds);

  return categories.map(cat => ({
    value: cat.category,
    label: cat.category,
    children: _.filter(lds, { category: cat.category })
      .filter(ld => !string2bool(ld.donotshow, false))
      .map(ld => ({
        value: ld.ldId,
        label: ld.title,
      })),
  }));
};

export const getCategoriesAndLayers = createNamedSelector(
  'getCategoriesAndLayers',
  getOPSAllLayerDefsArray,
  LayerDefs => categoriesAndLayers(LayerDefs),
);
