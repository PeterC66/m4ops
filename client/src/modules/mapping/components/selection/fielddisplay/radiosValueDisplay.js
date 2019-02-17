import {
  find,
} from 'lodash';

import { stringValueDisplay } from './helpers';

export default function radiosValueDisplay(
  createElement,
  value,
  values,
  radiosOptions,
  valueStyleClass,
) {
  let valueProperty = 'value';
  let nameProperty = 'name';

  if (radiosOptions) {
    if (radiosOptions.value) valueProperty = radiosOptions.value;
    if (radiosOptions.name) nameProperty = radiosOptions.name;
  }

  let valueToUse = 'N/A';
  const rowToUse = find(values, [valueProperty, value]);
  if (rowToUse) valueToUse = rowToUse[nameProperty];

  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}
