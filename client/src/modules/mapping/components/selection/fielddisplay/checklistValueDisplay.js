import {
  isObject,
  find,
} from 'lodash';

import {
  NOTFOUND,
  stringValueDisplay,
  stringValuesDisplay,
  valuesAsArray,
} from './helpers';


export default function checklistValueDisplay(
  createElement,
  value, // is an array - so we return an array
  values,
  checklistOptions,
  valueStyleClass,
) {
  const valuesArray = valuesAsArray(values);

  if (!isObject(valuesArray[0])) {
    return value.map(
      valueToUse => stringValueDisplay( // TODO can also be boolean or number
        createElement,
        valueToUse,
        null,
        valueStyleClass,
      ),
    );
  }

  // Past here values must be objects with value and name properties)
  let valueProperty = 'value';
  let nameProperty = 'name';

  if (checklistOptions) {
    if (checklistOptions.value) valueProperty = checklistOptions.value;
    if (checklistOptions.name) nameProperty = checklistOptions.name;
  }
  const valuesToUse = value.map(
    (v) => {
      let nameToUse = NOTFOUND;
      const valuesObjectToUse = find(valuesArray, [valueProperty, v]);
      if (valuesObjectToUse && (nameProperty in valuesObjectToUse)) {
        nameToUse = valuesObjectToUse[nameProperty];
      }
      return nameToUse;
    },
  );
  return stringValuesDisplay(createElement, valuesToUse, null, valueStyleClass);
}
