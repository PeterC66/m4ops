import { formatDatetimeValueToField } from './vfgHelpers';
import stringValueDisplay from './stringValueDisplay';

export default function dateTimeValueDisplay(
  createElement,
  value,
  inputType,
  valueStyleClass,
) {
  const valueToUse = formatDatetimeValueToField(value, inputType);
  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}
