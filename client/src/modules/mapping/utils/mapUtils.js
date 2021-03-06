// import OlFeature from 'ol/Feature';
import _ from 'lodash';

import { disabbreviate } from './stringManipulation';
import {
  beginsWith,
  isDefined,
  isString,
  toUCifString,
  padAllNumbers,
} from '../../../global/utils';
import store from '../../../store';

import { notOK } from '../../../global/constants';

export const attributionFromCode = (att) => {
  const attModified = disabbreviate(att);
  // WAS before v4.6.5 return new ol.Attribution({ html: attModified });
  return attModified;
};

export const getDirectValueOf = (propertyname, obj) => {
  // Note that this returns any property considered false or undefined as blank
  if (!propertyname || !obj) {
    return '';
  }
  if (!isString(propertyname)) {
    alert('Technical problem: getDirectValueOf has been called wrongly'); // eslint-disable-line no-alert
    console.log('propertyname, obj = ', propertyname, { ...obj }); // eslint-disable-line no-console
    return '';
  }

  if (propertyname in obj) return obj[propertyname];
  if ('properties' in obj
    && propertyname in obj.properties) return obj.properties[propertyname];
  // was hasOwnProperty but this did not see eg value

  // If through here then return blank
  return '';
};


// Find the index of the first location of a value (needle) in the "propertyname" element
// of a haystackArray
// Given M4 suffix to distinguish from ES6 function
export const indexOfArrayM4 = (haystackArray, needle, propertyname) => {
  const valUP = toUCifString(needle);
  for (let j = 0; j < haystackArray.length; j += 1) {
    if (valUP === toUCifString(getDirectValueOf(
      propertyname,
      haystackArray[j],
    ))) {
      return j;
    }
  }
  return -1; // meaning not found
};

/*


// TODO
const layerDefs = [];
const map = {};


// Is the given layer (0=Base, 1=Overlay, 2,3,4=Vector) defined?
export const isLayerDefined = (givenMap, layerIndex) => {
  let defined = true;
  const layer = givenMap.getLayers().getArray()[layerIndex];
  if (!isDefined(layer)) defined = false;
  return defined;
};

// Is the given layer (0=Base, 1=Overlay, 2,3,4=Vector) defined and visible?
export const isLayerVisible = (givenMap, layerIndex) => {
  let visible = true;
  if (isLayerDefined(givenMap, layerIndex)) {
    const layer = givenMap.getLayers().getArray()[layerIndex];
    if (!layer.getVisible()) visible = false;
  } else {
    visible = false;
  }
  return visible;
};

export const ldFromLayer = (layerIndex) => {
  if (isLayerDefined(map, layerIndex)) {
    return (layerDefs[map.getLayers().getArray()[layerIndex].fromLayerDef]);
  }
  return null;
};
*/

function mflEquivalent(propertyname, FSindex) {
  // Returns the equivalent from FieldSpecs of the given propertyname
  // eslint-disable-next-line max-len
  const mflSpecComboIndex = document.getElementById('mflSpecCombo').selectedIndex;
  const FSindexToUse = isDefined(FSindex) ? FSindex : mflSpecComboIndex - 1; // the current one
  const { OPSDetails } = store.getters;

  let result = '';
  const fieldSpec = OPSDetails.FieldSpecsArray[FSindexToUse];
  if (fieldSpec) {
    // console.log("In mflEquivalent for " + fieldSpec.FSid,propertyname);
    const fields = fieldSpec.FieldArray;
    if (fields) {
      const fieldindex = indexOfArrayM4(fields, propertyname, 'parameters');
      if (fieldindex >= 0) {
        result = fields[fieldindex].fieldname;
        // console.log("fieldindex result",fieldindex,result);
      }
    }
  }
  return result;
}

export const getAValueFor = (
  propertyname,
  object,
  usedefaults = true,
  useMflEquivalent = false,
) => {
  // Get the value of a property (such as 'description') for a feature (or other object),
  //  or its equivalent (if there is one on this layer)
  //  or its default (if there is one)

  if (!propertyname) {
    // eslint-disable-next-line no-console
    console.log('Error getAValueFor has no propertyname');
    return 'Error';
  }
  // eslint-disable-next-line no-console, max-len
  // console.log('getAValueForIN', propertyname, object, usedefaults, useMflEquivalent);

  // Handle Constants - indicated by # being the first character
  if (propertyname.charAt(0) === '#') {
    return propertyname.slice(1); // ie all but the #
  }

  // Handle concatenation (&)
  if (propertyname.includes('&')) {
    const propertynames = propertyname.split('&');
    let result = '';
    for (let i = 0; i < propertynames.length; i += 1) {
      result += getAValueFor(propertynames[i], object, usedefaults);
    }
    if (result) return result;
  }

  // Look for the property itself - and this does not need a layer
  const result0 = getDirectValueOf(propertyname, object);
  if (result0) return result0;

  // If not found, look for the equivalent of the propertyname
  //  Note that equivalents are always in the same structure as propertyname
  let equivalencies;
  let layerDef;
  const ldid = getDirectValueOf('ldid', object);
  if (ldid) {
    layerDef = store.getters.getOPSAllLayerDefsArrayByLdid(ldid);
  }
  if (layerDef) {
    // eslint-disable-next-line prefer-destructuring
    equivalencies = layerDef.equivalencies;
  } else {
    // eslint-disable-next-line no-console, max-len
    console.log('getAValueFor NO layerDef', propertyname, object, ldid);
  }
  // Each equivalency can be a ?-separated string of fieldnames
  if (equivalencies) {
    if (equivalencies[propertyname]) {
      const equivsToTry = equivalencies[propertyname].split('?');
      for (let i = 0; i < equivsToTry.length; i += 1) {
        if (equivsToTry[i] === propertyname) {
          // eslint-disable-next-line no-console
          console.log(`Technical error: Self-reference for ${propertyname}`);
          return 'ERROR';
        }
        const result = getAValueFor(equivsToTry[i], object);
        if (result) return result;
      }
    }
  }

  // Now try equivalencies from FieldSpecs
  if (useMflEquivalent) {
    const equivpropertyname = mflEquivalent(propertyname, 0); // Kludge for Valuation1910
    if (equivpropertyname) {
      const result = getDirectValueOf(equivpropertyname, object);
      if (result) return result;
    }
  }

  if (usedefaults) {
    // If not found, look for the (hard-coded) default property to use (a) in the same structure
    const fid = getDirectValueOf('featureid', object);
    switch (propertyname) {
      case 'textforsort':
        // console.log("GAV", object, layer);
        return padAllNumbers(getAValueFor('fl_col1', object));
      case 'description':
        // was      return getAValueFor("shorttext", object, layer); // This value is set (if it has an equivalent then it is also set as this)
        return '';
      case 'datestart':
      case 'evdatestart':
        return '0000-01-01';
      case 'dateend':
      case 'evdateend':
        return '9999-12-31';
      case 'shorttext':
        if (fid) return fid;
        break;
      case 'fl_col2':
      case 'fl_col3':
        return '?';
      case 'fl_col1':
      case 'featureid':
        return getDirectValueOf('shorttext', object);
      default:
    }
  }
  // If through here then return blank
  return '';
};

function yearNo(datestring) {
  if (datestring === '') return '?';
  const d = new Date(datestring);
  // else
  return d.getFullYear().toString();
}

export function startend(feature) {
  const startDateString = getAValueFor(
    'datestart',
    feature,
    false,
  ).toString();
  const endDateString = getAValueFor(
    'dateend',
    feature,
    false,
  ).toString();
  const result = `${yearNo(startDateString)}-${yearNo(endDateString)}`;
  return (result === '?-?') ? '' : result;
}

export const fullOpsUrl = (url) => {
  let result = url;
  if (!beginsWith(result, 'http')) { // it is in short form (eg *.geojson) and needs topping
    const { OPSDetails } = store.getters;
    result = `OPS/${OPSDetails.OPSCode}/${result}`;
  }
  return result;
};

// For encodeURI etc use see http://xkr.us/articles/javascript/encode-compare/
export const encodedFullOpsURL = (path, filename) => {
  const result = fullOpsUrl(path);
  return encodeURI(result)
  + (_.endsWith(result, '/') ? '' : '/')
  + encodeURIComponent(filename); // So any # in filename are encoded
};

function nonspecialMFLProps(feature) {
  // Return an array of relevant MFL properties
  function nonspecial(item) {
    // For filtering out non-relevant MFL properties
    return (['geometry', 'onMFL'].indexOf(item) < 0);
  }
  let propsArray = [];
  if (feature) {
    propsArray = Object.keys(feature.getProperties()).filter(nonspecial);
  }
  return propsArray;
}

function allProperties(feature) {
  const result = [];
  if (feature) {
    const propsArray = nonspecialMFLProps(feature);
    const propsSorted = propsArray.sort((a, b) => {
      const nameA = a.toUpperCase(); // ignore upper and lowercase
      const nameB = b.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // through here names must be equal
      return 0;
    });
    // console.log(propsArray, propsSorted);
    for (let i = 0; i < propsSorted.length; i += 1) {
      const prop = propsSorted[i];
      const fspec = {};
      fspec.fieldname = prop;
      // Treat as colour if name contains color or colour
      if (prop.indexOf('color') >= 0 || prop.indexOf('colour') >= 0) {
        fspec.fieldtype = 'color';
      } else { // would be nice to know other fieldtypes
        fspec.fieldtype = 'text';
      }
      fspec.label = prop;
      fspec.placeholder = prop;
      fspec.tooltip = 'The property';
      fspec.required = false;
      fspec.description = 'From the existing feature';
      fspec.comment = 'No comment';
      result.push(fspec);
    }
  }
  return result;
}

export function checkFSOK(FSindex) {
  // Given an integer index into the FieldSpecsArray check all is OK
  // Given a string value look for its value as FSid in FieldSpecsArray, then do the check
  // Given no such index (for an MFL), look it up from the mflSpecCombo and then do the check
  // Return the index, or notOK (-999) if not OK
  let FSindexToReturn;
  const { OPSDetails } = store.getters;

  // FSindex is the index into the FieldSpecsArray, if not given we look it up
  if (!isDefined(FSindex)) { // (For an MFL)
    // eslint-disable-next-line max-len
    const MFLScomboindex = document.getElementById('mflSpecCombo').selectedIndex;
    if (MFLScomboindex === 0) return -1; // combo index 0 is the special case of 'All (current) Properties' - no other validation is needed
    FSindexToReturn = MFLScomboindex - 1;
  } else if (isString(FSindex)) {
    if (!OPSDetails.FieldSpecsArray) {
      // eslint-disable-next-line no-console
      console.log(`No FieldSpecsArray: FSindex=${FSindex}`);
      return notOK;
    }
    // eslint-disable-next-line max-len
    FSindexToReturn = indexOfArrayM4(OPSDetails.FieldSpecsArray, FSindex, 'FSid');
    if (FSindexToReturn < 0) {
      // eslint-disable-next-line no-alert, max-len
      alert(`Error 73: THere is a problem with FSid=${FSindex}, please contact Peter`);
      return notOK;
    }
  } else { // Parameter is given and not a string, assumed an integer
    FSindexToReturn = FSindex;
  }

  // Validation
  if (!OPSDetails.FieldSpecsArray) {
    // eslint-disable-next-line no-alert, max-len
    alert('Sorry but you cannot enter details as you do not have any FieldSpecs set up yet. Try recompiling (and clear cache) and if still a problem, contact Peter.');
    return notOK;
  }
  if (!OPSDetails.FieldSpecsArray[FSindexToReturn]) {
    // eslint-disable-next-line no-alert, max-len
    alert(`Cannot find the given FieldSpec for index=${FSindexToReturn}. Try recompiling (and clear cache) and if still a problem, contact Peter.`);
    return notOK;
  }
  return FSindexToReturn;
}

export function fieldSpecWanted(FSindex, feature) {
  // Used after checkFSOK so can assume all validated
  let fieldSpec = {};
  if (FSindex >= 0) {
    const { OPSDetails } = store.getters;
    fieldSpec = OPSDetails.FieldSpecsArray[FSindex];
  } else { // -1 is a special case of 'All (current) Properties'
    fieldSpec.FSid = 'AP';
    fieldSpec.FSname = 'All Properties';
    // was    allCurrentProperties = allProperties(featureToBeAltered);
    // was    fieldSpec.FieldArray = allCurrentProperties;
    fieldSpec.FieldArray = allProperties(feature);
  }
  return fieldSpec;
}

export function fieldsWanted(fieldSpec) {
  // Used after checkFSOK and fieldSpecWanted
  const fields = fieldSpec.FieldArray; // even for MFLScomboindex == 0 - 'All (current) Properties'
  // Note that field named BB in FS has id in the form as D_BB (to avoid any duplication)
  //   and its value is taken from and put back into the property BB of the featureToBeAltered
  return fields;
}
