import {
  find,
  isEmpty,
  isObject,
  isNil,
} from 'lodash';

import stringValueDisplay from './stringValueDisplay';
import {
  NOTFOUND,
  valuesAsArray,
} from './helpers';

export default function selectValueDisplay(
  createElement,
  value,
  values,
  selectOptions = {},
  valueStyleClass = '',
) {
  if (isNil(value) || isNil(values) || isEmpty(values)) return null;
  const valuesArray = valuesAsArray(values);

  // First deal with case where values is a simple array of strings, hence we can use the value array as is
  if (!isObject(valuesArray[0])) {
    return stringValueDisplay(createElement, value, null, valueStyleClass);
  }

  // Past here values must be objects with id (sic) and name properties (which may be called something else)
  let idProperty = 'id';
  let nameProperty = 'name';

  if (selectOptions) {
    if (selectOptions.value) idProperty = selectOptions.value;
    if (selectOptions.name) nameProperty = selectOptions.name;
  }
  let nameToUse = NOTFOUND;
  const valuesObjectToUse = find(valuesArray, [idProperty, value]);
  if (valuesObjectToUse && (nameProperty in valuesObjectToUse)) {
    nameToUse = valuesObjectToUse[nameProperty];
  }

  return stringValueDisplay(createElement, nameToUse, null, valueStyleClass);
}
