import {
  isUndefined,
} from 'lodash';

import { formatDateValueToField } from './helpers';
import stringValueDisplay from './stringValueDisplay';

export default function dateTimeValueDisplay(
  createElement,
  value,
  inputType,
  valueStyleClass = '',
) {
  if (isUndefined(value) || isUndefined(inputType)) return null;

  const valueToUse = formatDateValueToField(value, inputType);
  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}
