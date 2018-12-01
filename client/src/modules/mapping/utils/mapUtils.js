import OlFeature from 'ol/Feature';

import { disabbreviate } from './stringManipulation';
import {
  isDefined,
  isString,
  toUCifString,
  padAllNumbers,
} from '../../../global/utils';
import store from '../../../store';

export const attributionFromCode = (att) => {
  const attModified = disabbreviate(att);
  // WAS before v4.6.5 return new ol.Attribution({ html: attModified });
  return attModified;
};

export const getDirectValueOf = (propertyname, obj) => {
  // console.log("gDV pn, obj = ", propertyname, $.extend({}, obj));
  // Note that this returns any property considered false or undefined as blank
  if (!propertyname || !obj) {
    return '';
  }
  if (!isString(propertyname)) {
    alert('Technical problem: getDirectValueOf has been called wrongly'); // eslint-disable-line no-alert
    console.log('propertyname, obj = ', propertyname, { ...obj }); // eslint-disable-line no-console
    return '';
  }
  const isFeature = (obj instanceof OlFeature);

  if (isFeature) {
    if (isDefined(obj.get(propertyname))) {
      return obj.get(propertyname);
    }
  } else if (propertyname in obj) return obj[propertyname];
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
export const isLayerDefined = (givenMap, layerindex) => {
  let defined = true;
  const layer = givenMap.getLayers().getArray()[layerindex];
  if (!isDefined(layer)) defined = false;
  return defined;
};

// Is the given layer (0=Base, 1=Overlay, 2,3,4=Vector) defined and visible?
export const isLayerVisible = (givenMap, layerindex) => {
  let visible = true;
  if (isLayerDefined(givenMap, layerindex)) {
    const layer = givenMap.getLayers().getArray()[layerindex];
    if (!layer.getVisible()) visible = false;
  } else {
    visible = false;
  }
  return visible;
};

export const ldFromLayer = (layerindex) => {
  if (isLayerDefined(map, layerindex)) {
    return (layerDefs[map.getLayers().getArray()[layerindex].fromLayerDef]);
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
  layer,
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
  // console.log("getAValueForIN",propertyname, $.extend({}, object), usedefaults);

  // Handle Constants - indicated by # being the first character
  if (propertyname.charAt(0) === '#') {
    return propertyname.slice(1); // ie all but the #
  }

  // Handle concatenation (&)
  if (propertyname.includes('&')) {
    const propertynames = propertyname.split('&');
    let result = '';
    for (let i = 0; i < propertynames.length; i += 1) {
      result += getAValueFor(propertynames[i], object, layer, usedefaults);
    }
    if (result) return result;
  }

  // Look for the property itself - and this does not need a layer
  const result0 = getDirectValueOf(propertyname, object);
  if (result0) return result0;

  // If not found, look for the equivalent of the propertyname
  //  Note that equivalents are always in the same structure as propertyname
  let equivalencies;
  if (layer) equivalencies = layer.get('equivalencies');
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
        const result = getAValueFor(equivsToTry[i], object, layer);
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
        return padAllNumbers(getAValueFor('fl_col1', object, layer));
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

export function startend(feature, layer) {
  const startDateString = getAValueFor(
    'datestart',
    feature,
    layer,
    false,
  ).toString();
  const endDateString = getAValueFor(
    'dateend',
    feature,
    layer,
    false,
  ).toString();
  const result = `${yearNo(startDateString)}-${yearNo(endDateString)}`;
  return (result === '?-?') ? '' : result;
}
