import { disabbreviate } from './abbreviation';

export const attributionFromCode = (att) => {
  const attModified = disabbreviate(att);
  // WAS before v4.6.5 return new ol.Attribution({ html: attModified });
  return attModified;
};

export const dummy = 0;

/*
import OlFeature from 'ol/feature';

import {

  isDefined,
  isString,
  toUCifString,
} from '../../../global/utils';

// TODO
const layerDefs = [];
const map = {};

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
    if (valUP === toUCifString(getDirectValueOf(propertyname, haystackArray[j]))) {
      return j;
    }
  }
  return -1; // meaning not found
};


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
