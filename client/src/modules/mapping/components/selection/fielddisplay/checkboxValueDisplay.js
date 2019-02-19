import {
  isNil,
} from 'lodash';

export default function checkboxValueDisplay(
  createElement,
  value,
  valueStyleClass = '',
) {
  if (isNil(value)) return null;

  const boxTickedOrNot = value ? '&#9745;' : '&#9744;';
  return createElement(
    'span',
    {
      class: valueStyleClass,
      domProps: { innerHTML: boxTickedOrNot },
    },
  );
}
