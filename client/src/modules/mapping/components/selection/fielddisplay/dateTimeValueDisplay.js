import { formatDatetimeValueToField } from './vfgHelpers';
import {
  stringValueDisplay,
} from './helpers';

export default function dateTimeValueDisplay(
  createElement,
  value,
  inputType,
  valueStyleClass,
) {
  const valueToUse = formatDatetimeValueToField(value, inputType);
  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}
