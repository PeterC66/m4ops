/* eslint-disable max-len */
import _ from 'lodash';

import {
  isNotExcluded,
  isDefined,
} from '../../../global/utils';
import optionsFromContinents from './optionsFromContinents';
import categoriesAndLayers from './categoriesAndLayers';
import optionsByPlaces from './optionsByPlaces';
import { reasonForNotAllowingLayer } from '../../../modules/users/validateEtc';
import { CLEAR_FORM_FIELD } from '../../mutation-types';

const vuexApiMutations = {
  [CLEAR_FORM_FIELD](moduleState, payload) {
    const { formId, fieldName } = payload;
    const formDataArray = moduleState.forms.resp.data.data || [];
    if (formId && fieldName && !_.isEmpty(formDataArray)) {
      const formI = _.findIndex(formDataArray, f => f._id === formId);
      if (isDefined(formI)) {
        if (isDefined(formDataArray[formI])) {
          if (isDefined(formDataArray[formI].vfg_model[fieldName])) {
            const bef = moduleState.forms.resp.data.data[formI].vfg_model[fieldName];
            moduleState.forms.resp.data.data[formI].vfg_model[fieldName] = '';
            // eslint-disable-next-line no-console
            console.log(`cFF FDA[${formI}] from ${bef} to ${moduleState.forms.resp.data.data[formI].vfg_model[fieldName]}`);
          } else {
            // eslint-disable-next-line no-console
            console.log(`cFF no FDA[${formI}].vf`, payload, formDataArray);
          }
        } else {
        // eslint-disable-next-line no-console
          console.log(`cFF no FDA[${formI}]`, payload, formDataArray);
        }
      } else {
      // eslint-disable-next-line no-console
        console.log('cFF no formI', payload, formDataArray);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('cFF input issue', payload, formDataArray);
    }
  },
};

const vuexApiActions = {
  clearFormField({ commit }, { formId, fieldName }) {
    commit(CLEAR_FORM_FIELD, { formId, fieldName });
  },
};

const vuexApiGetters = {};

// m4opsdata ========================================================
// Note the double .data in all top levels (one from vuex-api and the other from the server)
vuexApiGetters.m4opsdata = moduleState => (moduleState.m4opsdata
  && moduleState.m4opsdata.resp
  && moduleState.m4opsdata.resp.data
  && moduleState.m4opsdata.resp.data.data)
  || {};

vuexApiGetters.WorldLayerDefsArray = (moduleState, getters) => getters.m4opsdata.WorldLayerDefsArray || [];

vuexApiGetters.DefinedLayerDefsArray = (moduleState, getters) => getters.m4opsdata.DefinedLayerDefsArray || [];

vuexApiGetters.AreasArray = (moduleState, getters) => getters.m4opsdata.AreasArray || [];

vuexApiGetters.TextConversionsArray = (moduleState, getters) => getters.m4opsdata.TextConversionsArray || [];

vuexApiGetters.AbbreviationsArray = (moduleState, getters) => getters.m4opsdata.AbbreviationsArray || [];

vuexApiGetters.toAbbreviateArray = (moduleState, getters) => getters.m4opsdata.toAbbreviateArray || [];

vuexApiGetters.DefaultColourSetsArray = (moduleState, getters) => getters.m4opsdata.DefaultColourSetsArray || [];

vuexApiGetters.showlevels = (moduleState, getters) => getters.m4opsdata.showlevels || [];

vuexApiGetters.demoSections = (moduleState, getters) => getters.m4opsdata.demoSections || [];

vuexApiGetters.HelpHTML = (moduleState, getters) => getters.m4opsdata.HelpHTML || '';

// Places ========================================================

vuexApiGetters.places = moduleState => (moduleState.places
  && moduleState.places.resp
  && moduleState.places.resp.data
  && moduleState.places.resp.data.data)
  || [];

// Place ========================================================

vuexApiGetters.place = moduleState => (moduleState.place
  && moduleState.place.resp
  && moduleState.place.resp.data
  && moduleState.place.resp.data.data)
  || {};

// OPSDetails is a synonym of place
vuexApiGetters.OPSDetails = (moduleState, getters) => getters.place || {};

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

vuexApiGetters.OPSLayerDefsArray = (moduleState, getters) => getters.place.LayerDefsArray || [];

// the Area the place is in
vuexApiGetters.Area = (moduleState, getters) => (getters.AreasArray
  .filter(area => (area.AreaCode === getters.place.Area))[0]) // should just be the one
  || {};

// the LayerDefs from the Area the place is in
vuexApiGetters.AreaLayerDefsArray = (moduleState, getters) => getters.Area.LayerDefsArray || [];

// the (common) DefinedLayers from the Area the place is in
vuexApiGetters.AreaDefinedLayerDefsArray = (moduleState, getters) => {
  if (
    !isDefined(getters.Area)
      || !isDefined(getters.DefinedLayerDefsArray)
      || !isDefined(getters.Area.AreaLayerDefs)
  ) return [];
  return getters.DefinedLayerDefsArray.filter(ld => _.includes((getters.Area.AreaLayerDefs), ld.title));
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

vuexApiGetters.LayerDefsArrayBeforeExclusions = (moduleState, getters) => [].concat(
  getters.WorldLayerDefsArray,
  getters.AreaLayerDefsArray,
  getters.AreaDefinedLayerDefsArray,
  getters.OPSLayerDefsArray,
);

// Then we need to exclude certain LayerDefs

vuexApiGetters.OPSAllLayerDefsArray = (moduleState, getters) => (getters.LayerDefsArrayBeforeExclusions || [])
  .filter(ld => (isNotExcluded(ld, (getters.place || {}).ExclusionsArray)));

// Helper routines for access

vuexApiGetters.getOPSAllLayerDefsArrayByLdid = (moduleState, getters) => ldid => _.find(getters.OPSAllLayerDefsArray, { ldid }) || {};

vuexApiGetters.getOPSAllLayerDefsArrayByTitle = (moduleState, getters) => title => _.find(getters.OPSAllLayerDefsArray, { title }) || {};

// Then we need a version that excludes LayerDefs the current User cannot see

vuexApiGetters.OPSAllLayerDefsCurrentUserCanSeeArray = (moduleState, getters) => (getters.OPSAllLayerDefsArray || [])
  .filter(ld => (!reasonForNotAllowingLayer(ld)));

// ----------------------------------------------------------------------

// The 2-level options for the ChooseLayer cascaders - only what the current User can see
vuexApiGetters.layerOptions = (moduleState, getters) => categoriesAndLayers(getters.OPSAllLayerDefsCurrentUserCanSeeArray);

// Forms

vuexApiGetters.OPSFormsArray = (moduleState, getters) => getters.place.FormsArray || [];
vuexApiGetters.getOPSFormById = (moduleState, getters) => id => _.find(getters.OPSFormsArray, f => f._id === id) || {};

vuexApiGetters.getOPSFormByLdid = (moduleState, getters) => (ldid) => {
  const layerDef = getters.getOPSAllLayerDefsArrayByLdid(ldid);
  if (!isDefined(layerDef) || !layerDef.formId) return {};
  return getters.getOPSFormById(layerDef.formId);
};

// Continents ========================================================

vuexApiGetters.continents = moduleState => (moduleState.continents
  && moduleState.continents.resp
  && moduleState.continents.resp.data
  && moduleState.continents.resp.data.data)
  || [];

vuexApiGetters.placeOptions = (moduleState, getters) => optionsFromContinents(getters.continents, getters.places);

vuexApiGetters.placeOptionsLinear = (moduleState, getters) => optionsByPlaces(getters.continents, getters.places) || [];

vuexApiGetters.getOptionsArrayByPlace = (moduleState, getters) => opsCode => _.find(getters.placeOptionsLinear, po => po[3] === opsCode);

vuexApiGetters.getPlaceFromPlaces = (moduleState, getters) => opsCode => _.find(getters.places, p => p.OPSCode === opsCode);

// Forms ========================================================

vuexApiGetters.forms = moduleState => (moduleState.forms
  && moduleState.forms.resp
  && moduleState.forms.resp.data
  && moduleState.forms.resp.data.data)
  || [];

vuexApiGetters.getFormById = (moduleState, getters) => id => _.find(getters.forms, f => f._id === id) || {};

export default { getters: vuexApiGetters, mutations: vuexApiMutations, actions: vuexApiActions };
