import proj4 from 'proj4';

import { isString } from '../../../global/utils';
// =================================== From NLS with thanks ==================================
// The parameters for the British National Grid - EPSG:27700

/* eslint max-len: ["error", { "ignoreComments": true }] */
/* eslint-disable max-len */
/* cSpell:disable */
proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs');
/* cSpell:enable */
/* eslint-enable max-len */

// This code below converts the (EPSG:27700) lat lon into a British National Grid Reference. With thanks from http://www.movable-type.co.uk/scripts/latlong-gridref.html NT261732
export function gridrefNumToLet(eOriginal, nOriginal, digits) { // easting & northing, and precision
  // get the 100km-grid indices
  const e100k = Math.floor(eOriginal / 100000);


  const n100k = Math.floor(nOriginal / 100000);

  if (e100k < 0 || e100k > 6 || n100k < 0 || n100k > 12) return '';

  /* eslint-disable no-mixed-operators */
  // translate those into numeric equivalents of the grid letters
  let l1 = (19 - n100k) - (19 - n100k) % 5 + Math.floor((e100k + 10) / 5);
  let l2 = (19 - n100k) * 5 % 25 + e100k % 5;
  /* eslint-enable no-mixed-operators */

  // compensate for skipped 'I' and build grid letter-pairs
  if (l1 > 7) l1 += 1;
  if (l2 > 7) l2 += 1;
  // The static String.fromCharCode() method returns a string created from the specified sequence of UTF-16 code units.
  const letPair = String.fromCharCode(
    l1 + 'A'.charCodeAt(0),
    l2 + 'A'.charCodeAt(0),
  );

  // strip 100km-grid indices from easting & northing, and reduce precision
  const e = Math.floor((eOriginal % 100000) / (10 ** (5 - digits / 2)));
  const n = Math.floor((nOriginal % 100000) / (10 ** (5 - digits / 2)));
  /* was
  e = Math.floor((e % 100000) / Math.pow(10, 5 - digits / 2));
  n = Math.floor((n % 100000) / Math.pow(10, 5 - digits / 2));
  */
  /* was
  Number.prototype.padLZ = function (w) {
    let nAny = this.toString();
    while (nAny.length < w) nAny = `0${nAny}`;
    return nAny;
  }; */

  const padLZ = (nAnyNumber, w) => {
    let nAny = nAnyNumber.toString();
    while (nAny.length < w) nAny = `0${nAny}`;
    return nAny;
  };

  // was const gridRef = letPair + e.padLZ(digits / 2) + n.padLZ(digits / 2);
  const gridRef = letPair + padLZ(e, digits / 2) + padLZ(n, digits / 2);

  return gridRef;
}

export function gridrefLetToNum(gridref) {
  // Converts a British National Grid Reference into the (EPSG:27700) easting & northing.
  // First 2 chars must be in range HP to TV - see https://en.wikipedia.org/wiki/Ordnance_Survey_National_Grid
  //   and remainder must be numeric (except for any spaces)

  if (!isString(gridref)) return null; // gridref must be a string

  // get numeric values of letter references, mapping A->0, B->1, C->2, etc:
  let l1 = gridref.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
  let l2 = gridref.toUpperCase().charCodeAt(1) - 'A'.charCodeAt(0);
  if (l1 < 7 || l1 > 19) return null; // First letter must be H to T (A is 0)
  if (l2 < 0 || l2 > 25) return null; // Second letter must be A to Z

  // shuffle down letters after 'I' since 'I' is not used in grid:
  if (l1 > 7) l1 -= 1;
  if (l2 > 7) l2 -= 1;


  // skip grid letters to get numeric part of ref, stripping any spaces:
  const numericgridref = gridref.slice(2).replace(/ /g, '');
  if (Number.isNaN(numericgridref)) return null; // numericgridref must be numeric (so if "Not A Number" return null)

  // convert grid letters into 100km-square indexes from false origin (grid square SV):
  let e = ((l1 - 2) % 5) * 5 + (l2 % 5);
  let n = (19 - Math.floor(l1 / 5) * 5) - Math.floor(l2 / 5);

  // append numeric part of references to grid index:
  e += numericgridref.slice(0, numericgridref.length / 2);
  n += numericgridref.slice(numericgridref.length / 2);

  // normalise to 1m grid, rounding up to centre of grid square:
  switch (numericgridref.length) {
    case 2: e += '5000'; n += '5000'; break; // 2-digit ref so 10,000m squares
    case 4: e += '500'; n += '500'; break; // 4-digit ref so 1000m squares
    case 6: e += '50'; n += '50'; break; // 6-digit ref so 100m squares
    case 8: e += '5'; n += '5'; break; // 8-digit ref so 10m squares
    case 10: break; // 10-digit refs are already 1m
    default: return null; // the 2 parts of the ref must be the same length, and no longer than 5 each
  }

  return [e, n]; // Remember this is (EPSG:27700) easting & northing
}
