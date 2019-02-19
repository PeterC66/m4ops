import {
  isNil,
} from 'lodash';

import { formatDateValueToField } from './helpers';
import stringValueDisplay from './stringValueDisplay';

export default function dateTimeValueDisplay(
  createElement,
  value,
  inputType,
  valueStyleClass = '',
) {
  if (isNil(value) || isNil(inputType)) return null;

  const valueToUse = formatDateValueToField(value, inputType);
  if (isNil(valueToUse)) return null;

  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}
