import {
  isUndefined,
} from 'lodash';

import { formatDatetimeValueToField } from './vfgHelpers';
import stringValueDisplay from './stringValueDisplay';

export default function dateTimeValueDisplay(
  createElement,
  value,
  inputType,
  valueStyleClass = '',
) {
  if (isUndefined(value) || isUndefined(inputType)) return null;

  const valueToUse = formatDatetimeValueToField(value, inputType);
  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}
