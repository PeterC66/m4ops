import _ from 'lodash';
import uuid from 'uuid';

/**
|--------------------------------------------------
| NOte that many of these utility functions are inherited from the old system,
| and need rationalising.
|--------------------------------------------------
*/
/*
Remember can use console.log(a,b,c); for debugging
or console.log("dates %s-%s, id %d, layer %O", string, string, number, object);
console.log("text",$.extend({}, object)); shows what the object was at the time (by cloning it)
Use console.log() for logging lines that are wanted permanently
Used for where we want to keep the logging statement permanently
Each call to console.log should have unique text so we can work out where it came from
 */
// export const console.log = (args) => {
//   console.log.apply(this, args); // eslint-disable-line no-console
// };
/*
Note: apply() takes any function arguments as an array,
call() is similar but takes any function arguments separately.
From https://stackoverflow.com/questions/1959040/is-it-possible-to-send-a-variable-number-of-arguments-to-a-javascript-function
*/


// Is the given value defined?
export const isDefined = val => (typeof val !== 'undefined');

// Is the given value not defined or an empty string?
export const isEmpty = (val) => {
  if (!isDefined(val)) return true;
  return (val === '');
};

// WAS export const isEmptyArray = arr => !Array.isArray(arr) || !arr.length;
export const isEmptyArray = arr => _.isEmpty(arr);

// Is the given value defined and boolean true
export const isTrue = (val) => {
  // WAS if (!isEmpty(val) && val) return true;
  if (isDefined(val) && val) return true;
  return false;
};

// Return the value or, if not given, the default
export const valueOrDefault = (val, def) => {
  if (isDefined(val)) {
    return val;
  }
  return def;
};


// From https://stackoverflow.com/questions/28814585/how-to-check-if-type-is-boolean
export const isBoolean = obj => (typeof (obj) === 'boolean');

// From https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string
// Note must be called with raw data not after eg Decode, else argument will be a string "Undefined"
export const isString =
  obj => (Object.prototype.toString.call(obj) === '[object String]');

export const toUCifString = (val) => {
  if (isString(val)) {
    return val.toUpperCase(); // it is a string
  }
  return val; // its something else
};

export const string2bool = (strV0, defaultifnull = false) => {
  // given a string, return a boolean value corresponding to the text,
  // and if in any doubt return the default
  // The default for the default is false
  if (!isDefined(strV0)) return false;
  if (typeof strV0 === 'boolean') return strV0;
  const strV = toUCifString(strV0);
  if (strV === 'TRUE') return true;
  if (strV === 'FALSE') return false;
  // If the value is anything else we come through here
  return (typeof defaultifnull === 'boolean')
    ? defaultifnull
    : string2bool(defaultifnull, false);
};

// From https://www.codementor.io/michelre/use-function-composition-in-javascript-gkmxos5mj
// Use eg pipe(mapWords, reduceWords)(['foo', 'bar', 'baz']); - left to right
export const pipe =
  (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

export const beginsWith = (string = '', target) => _.startsWith(string, target);

export const befaft = (str, separator) => {
  // Given a string, separate it and return the before and after as a 2-element array
  // ensure each is a valid string (maybe "")
  // Needed as split is different in js from php
  const result = ['', ''];
  if (!isEmpty(str) && !isEmpty(separator)) {
    const resultBefore = str.split(separator)[0];
    if (resultBefore) {
      result[0] = resultBefore;
      result[1] = str.slice(resultBefore.length + separator.length);
    } else {
      result[1] = str;
    }
  }
  return result;
};

export const pdcArraySearch = (valueToFind, arrayOfArrays, keyName) => {
  // Returns the array in the given arrayOfArrays which has a key value as given
  if (valueToFind && arrayOfArrays && keyName) {
    for (let i = 0; i < arrayOfArrays.length; i += 1) {
      if (valueToFind === arrayOfArrays[i][keyName]) return arrayOfArrays[i];
    }
  }
  return null;
};

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'); // eslint-disable-line no-useless-escape
}

// From https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
export const replaceAll = (str, find, replace) => {
  if (!str || !find) {
    console.log('Problem in replaceAll', str, find, replace); // eslint-disable-line no-console
    return str;
  }
  if (isString(str)) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }
  console.log('Trying replace on non-string', str); // eslint-disable-line no-console
  return str;
};

export const replaceOnce = (string, omit, place) => {
  if (!string || !omit) {
    return string;
  }
  return string.replace(omit, place);
};

export function addUuidKeyToArray(arr) {
  if (!arr) return arr;
  const keyedArray = arr.map((element, index) => (
    { ...element, uuidKey: uuid(), originalIndex: index }
  ));
  return keyedArray;
}

// Adapted from http://learnjsdata.com/combine_data.html
export function join(
  lookupTable,
  mainTable,
  lookupKey,
  mainKey,
  isInner,
  select,
) {
  const l = lookupTable.length;
  const m = mainTable.length;
  const lookupIndex = [];
  const output = [];
  for (let i = 0; i < l; i += 1) { // loop through l items
    const row = lookupTable[i];
    lookupIndex[row[lookupKey]] = row; // create an index for lookup table
  }
  for (let j = 0; j < m; j += 1) { // loop through m items
    const y = mainTable[j];
    const x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
    if (!isInner || isDefined(x)) output.push(select(y, x)); // select only the columns you need
  }

  return output;
}
/* Use thus
var result = join(lookupTable, mainTable, "id", "brand_id", function(mainTableRow, lookupTableRow) {
    return {
        id: mainTableRow.id,
        name: mainTableRow.name,
        weight: mainTableRow.weight,
        price: mainTableRow.price,
        brand: (lookupTableRow !== undefined) ? lookupTableRow.name : null
    };
});
*/

// return an array without elements in the exclusionsArray - matched by category and title
export function isNotExcluded(ld, exclusionsArray) {
  if (!ld || !exclusionsArray) return true;
  const result = (
    _.filter(exclusionsArray, { category: ld.category, title: ld.title })
      .length === 0
  );
  return result;
}

const strVoid = 'void';

export function newVoid() {
  return strVoid + uuid();
}

export function isVoid(ldid) {
  return ldid.substring(0, 4) === strVoid;
}

