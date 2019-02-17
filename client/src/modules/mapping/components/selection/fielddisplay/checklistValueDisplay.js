import {
  isObject,
  find,
} from 'lodash';

import {
  NOTFOUND,
  valuesAsArray,
} from './helpers';
import stringValuesDisplay from './stringValuesDisplay';


export default function checklistValueDisplay(
  createElement,
  value, // is an array - and we return an array
  values,
  checklistOptions,
  valueStyleClass,
) {
  const valuesArray = valuesAsArray(values);

  // First deal with case where values is a simple array of strings, hence we can use the value array as is
  if (!isObject(valuesArray[0])) {
    return stringValuesDisplay(createElement, value, null, valueStyleClass);
  }

  // Past here values must be objects with value and name properties (which may be called something else)
  let valueProperty = 'value';
  let nameProperty = 'name';

  if (checklistOptions) {
    if (checklistOptions.value) valueProperty = checklistOptions.value;
    if (checklistOptions.name) nameProperty = checklistOptions.name;
  }
  const namesToUse = value.map(
    (v) => {
      let nameToUse = NOTFOUND;
      const valuesObjectToUse = find(valuesArray, [valueProperty, v]);
      if (valuesObjectToUse && (nameProperty in valuesObjectToUse)) {
        nameToUse = valuesObjectToUse[nameProperty];
      }
      return nameToUse;
    },
  );
  return stringValuesDisplay(createElement, namesToUse, null, valueStyleClass);
}
