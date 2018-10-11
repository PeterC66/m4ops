import { store } from '../../App';
import { valueOrDefault } from '../../global/utils';
import { paramDefaultFromOPSDetails, paramDefaultMap } from './paramDefaultFromOPSDetails';
import { getPlace } from '../geography';

const URL = require('url-parse');

export const URLParams = (url) => {
  const urlObject = new URL(url || window.location.href, true);
  return urlObject.query;
};

export const paramDefaultBare = (param) => {
  // Return the default value of the given parameter from Redux without React
  const OPSDetails = getPlace(store.getState());

  return paramDefaultFromOPSDetails(OPSDetails, param);
};

// Return the value of the given parameter or, if not given, the default value
// Note that missing Params are undefined, but missing values are returned as boolean true

// TODO Now parameters given, eg Green, now return ''

export const paramValueOrDefaultFromOPSDetails = (OPSDetails, param) => {
  valueOrDefault(URLParams[param], paramDefaultFromOPSDetails(OPSDetails, param));
};

export const paramValueOrDefault = (param) => {
  valueOrDefault(URLParams[param], paramDefaultBare(param));
};

export const allDefaultParams = (OPSDetails) => {
  const result = {};
  paramDefaultMap.forEach((value, key) => {
    result[key] = OPSDetails ? value(OPSDetails) : 'Unknown OPSDetails';
  });
  return result;
};
