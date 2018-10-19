import _ from 'lodash';

import {
  pipe,
  string2bool,
  isNotExcluded,
  isDefined,
} from '../../../global/utils';
import optionsFromContinents from './optionsFromContinents';

const vuexApiGetters = {};

// m4opsdata ========================================================
// Note the double .data in all top levels (one from vuex-api and the other from the server)
vuexApiGetters.m4opsdata = moduleState =>
  (moduleState.m4opsdata &&
  moduleState.m4opsdata.resp &&
  moduleState.m4opsdata.resp.data &&
  moduleState.m4opsdata.resp.data.data) ||
  {};

vuexApiGetters.WorldLayerDefsArray = (moduleState, getters) =>
  getters.m4opsdata.WorldLayerDefsArray || [];

vuexApiGetters.DefinedLayerDefsArray = (moduleState, getters) =>
  getters.m4opsdata.DefinedLayerDefsArray || [];

vuexApiGetters.AreasArray = (moduleState, getters) =>
  getters.m4opsdata.AreasArray || [];

vuexApiGetters.TextConversionsArray = (moduleState, getters) =>
  getters.m4opsdata.TextConversionsArray || [];

vuexApiGetters.AbbreviationsArray = (moduleState, getters) =>
  getters.m4opsdata.AbbreviationsArray || [];

vuexApiGetters.toAbbreviateArray = (moduleState, getters) =>
  getters.m4opsdata.toAbbreviateArray || [];

vuexApiGetters.DefaultColourSetsArray = (moduleState, getters) =>
  getters.m4opsdata.DefaultColourSetsArray || [];

vuexApiGetters.showlevels = (moduleState, getters) =>
  getters.m4opsdata.showlevels || [];

vuexApiGetters.demoSections = (moduleState, getters) =>
  getters.m4opsdata.demoSections || [];

vuexApiGetters.HelpHTML = (moduleState, getters) =>
  getters.m4opsdata.HelpHTML || '';

// Place ========================================================

vuexApiGetters.place = moduleState =>
  (moduleState.place &&
  moduleState.place.resp &&
  moduleState.place.resp.data &&
  moduleState.place.resp.data.data) ||
  {};

// OPSDetails is a synonym of place
vuexApiGetters.OPSDetails = (moduleState, getters) =>
  getters.place || {};

vuexApiGetters.OPSLayerDefsArray = (moduleState, getters) =>
  getters.place.LayerDefsArray || [];

// the Area the place is in
vuexApiGetters.Area = (moduleState, getters) =>
  (getters.AreasArray
    .filter(area => (area.AreaCode === getters.place.Area))[0]) || // should just be the one
  {};

// the LayerDefs from the Area the place is in
vuexApiGetters.AreaLayerDefsArray = (moduleState, getters) =>
  getters.Area.LayerDefsArray || [];

// the (common) DefinedLayers from the Area the place is in
vuexApiGetters.AreaDefinedLayerDefsArray = (moduleState, getters) => {
  if (
    !isDefined(getters.Area)
      || !isDefined(getters.DefinedLayerDefsArray)
      || !isDefined(getters.Area.AreaLayerDefs)
  ) return [];
  return getters.DefinedLayerDefsArray.filter(ld =>
    _.includes((getters.Area.AreaLayerDefs), ld.title));
};

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

vuexApiGetters.LayerDefsArrayBeforeExclusions = (moduleState, getters) =>
  [].concat(
    getters.WorldLayerDefsArray,
    getters.AreaLayerDefsArray,
    getters.AreaDefinedLayerDefsArray,
    getters.OPSLayerDefsArray,
  );

// Finally we need to exclude certain LayerDefs

vuexApiGetters.OPSAllLayerDefsArray = (moduleState, getters) =>
  (getters.LayerDefsArrayBeforeExclusions || [])
    .filter(ld => (isNotExcluded(ld, (getters.place || {}).ExclusionsArray)));

/**
 *--------------------------------------------------
 * getCategoriesAndLayers takes an array of LayerDefs and returns a two level array
 * of Layers within Categories, to be the options object (array) for a cascader.
 * Only layers of given types are included, and any with donotshow set to TRUE are excluded.
 *--------------------------------------------------
 */
const layertypesGiven = [
  'Tile',
  'VectorTile',
  'WMS',
  'WMTS',
  'Group',
  'Series',
  'Vector',
];

const extractCategories = pipe(
  arr => arr.filter(ld => (ld ? !string2bool(ld.donotshow, false) : false)),
  arr => arr.filter(ld => (ld ? (layertypesGiven.indexOf(ld.layertype) !== -1) : false)), // eslint-disable-line max-len
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

vuexApiGetters.CategoriesAndLayers = (moduleState, getters) =>
  categoriesAndLayers(getters.OPSAllLayerDefsArray);

// Continents ========================================================

vuexApiGetters.continents = moduleState =>
  (moduleState.continents &&
  moduleState.continents.resp &&
  moduleState.continents.resp.data &&
  moduleState.continents.resp.data.data) ||
  [];

vuexApiGetters.options = (moduleState, getters) =>
  optionsFromContinents(getters.continents);

export default vuexApiGetters;
