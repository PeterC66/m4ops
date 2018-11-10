import _ from 'lodash';

import {
  isNotExcluded,
  isDefined,
} from '../../../global/utils';
import optionsFromContinents from './optionsFromContinents';
import categoriesAndLayers from './categoriesAndLayers';
// import optionsByPlaces from './optionsByPlaces';

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

// Places ========================================================

vuexApiGetters.places = moduleState =>
  (moduleState.places &&
  moduleState.places.resp &&
  moduleState.places.resp.data &&
  moduleState.places.resp.data.data) ||
  [];

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

// Note that homeView is not an olView
vuexApiGetters.homeView = (moduleState, getters) => {
  const ops = getters.place;
  if (_.isEmpty(ops)) return {};
  return {
    center: [ops.Lon, ops.Lat],
    // center: OLProj.transform(
    //   [parseFloat(ops.Lon), parseFloat(ops.Lat)],
    //   'EPSG:4326',
    //   'EPSG:3857',
    // ),
    zoom: ops.Zoom,
    rotation: ops.Rotation,
  };
};

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

vuexApiGetters.getOPSAllLayerDefsArrayByLdid = (moduleState, getters) =>
  ldid => _.find(getters.OPSAllLayerDefsArray, { ldid }) || {};

vuexApiGetters.getOPSAllLayerDefsArrayByTitle = (moduleState, getters) =>
  title => _.find(getters.OPSAllLayerDefsArray, { title }) || {};

// ----------------------------------------------------------------------

// The 2-level options for the ChooseLayer cascaders
vuexApiGetters.layerOptions = (moduleState, getters) =>
  categoriesAndLayers(getters.OPSAllLayerDefsArray);

// Continents ========================================================

vuexApiGetters.continents = moduleState =>
  (moduleState.continents &&
  moduleState.continents.resp &&
  moduleState.continents.resp.data &&
  moduleState.continents.resp.data.data) ||
  [];

vuexApiGetters.placeOptions = (moduleState, getters) =>
  optionsFromContinents(getters.continents, getters.places);

// vuexApiGetters.placeOptionsLinear = (moduleState, getters) =>
//   optionsByPlaces(getters.continents, getters.places) || [];

// vuexApiGetters.getOptionsArrayByPlace = (moduleState, getters) =>
//   opsCode =>
//     _.find(getters.placeOptionsLinear, { opsCode });

export default vuexApiGetters;
