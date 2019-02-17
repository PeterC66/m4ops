import {
  toString,
} from 'lodash';

export default function stringValueDisplay(
  createElement,
  value,
  get,
  valueStyleClass,
) {
  const valueToUse = toString(get ? get(value) : value);
  return createElement(
    'span',
    { class: valueStyleClass },
    `${valueToUse}`,
  );
}
