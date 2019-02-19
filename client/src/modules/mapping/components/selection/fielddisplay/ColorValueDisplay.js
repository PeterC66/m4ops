import {
  isUndefined,
} from 'lodash';

import { formatColorValueToField } from './helpers';

export default function ColorValueDisplay(
  createElement,
  value,
  valueStyleClass = '',
) {
  if (isUndefined(value)) return null;

  const valueToUse = formatColorValueToField(value);
  if (!valueToUse) return null;

  return createElement(
    'span',
    {
      class: {
        valueStyleClass,
        'color-box': true,
      },
      style: {
        'background-color': valueToUse,
      },
    },
  );
}
