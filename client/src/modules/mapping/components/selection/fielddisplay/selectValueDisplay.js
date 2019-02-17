import {
  find,
} from 'lodash';

import {
  stringValueDisplay,
} from './helpers';

export default function selectValueDisplay(
  createElement,
  value,
  values,
  selectOptions,
  valueStyleClass,
) {
  let idProperty = 'id';
  let nameProperty = 'name';

  if (selectOptions) {
    if (selectOptions.value) idProperty = selectOptions.value;
    if (selectOptions.name) nameProperty = selectOptions.name;
  }

  let valueToUse = 'N/A';
  const rowToUse = find(values, [idProperty, value]);
  if (rowToUse) valueToUse = rowToUse[nameProperty];

  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}
