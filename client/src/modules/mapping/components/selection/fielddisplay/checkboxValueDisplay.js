import {
  isUndefined,
} from 'lodash';

export default function checkboxValueDisplay(
  createElement,
  value,
  valueStyleClass = '',
) {
  if (isUndefined(value)) return null;

  const boxTickedOrNot = value ? '&#9745;' : '&#9744;';
  return createElement(
    'span',
    {
      class: valueStyleClass,
      domProps: { innerHTML: boxTickedOrNot },
    },
  );
}
