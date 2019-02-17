import {
  find,
  isObject,
} from 'lodash';

import stringValueDisplay from './stringValueDisplay';
import {
  NOTFOUND,
  valuesAsArray,
} from './helpers';

export default function radiosValueDisplay(
  createElement,
  value,
  values,
  radiosOptions,
  valueStyleClass,
) {
  const valuesArray = valuesAsArray(values);

  // First deal with case where values is a simple array of strings, hence we can use the value as is
  if (!isObject(valuesArray[0])) {
    return stringValueDisplay(createElement, value, null, valueStyleClass);
  }

  // Past here values must be objects with value and name properties (which may be called something else)
  let valueProperty = 'value';
  let nameProperty = 'name';

  if (radiosOptions) {
    if (radiosOptions.value) valueProperty = radiosOptions.value;
    if (radiosOptions.name) nameProperty = radiosOptions.name;
  }
  let nameToUse = NOTFOUND;
  const valuesObjectToUse = find(valuesArray, [valueProperty, value]);
  if (valuesObjectToUse && (nameProperty in valuesObjectToUse)) {
    nameToUse = valuesObjectToUse[nameProperty];
  }

  return stringValueDisplay(createElement, nameToUse, null, valueStyleClass);
}
