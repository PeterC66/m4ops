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
      },
    },
    [
      createElement(
        'span',
        {
          style: {
            'background-color': valueToUse.color,
            width: '15px',
            height: '10px',
            display: 'inline-block',
            position: 'relative',
            left: '5px',
            top: '1px',
            'border-style': 'solid',
            'border-width': 'thin',
            'margin-right': '3px',

          },
        },
      ),
      ` ${valueToUse.name}`,
    ],
  );
}
