import {
  isFunction,
  isUndefined,
  toString,
} from 'lodash';

export default function stringValueDisplay(
  createElement,
  value,
  get,
  valueStyleClass = '',
) {
  if (isUndefined(value)) return null;

  const valueToUse = toString(isFunction(get) ? get(value) : value);
  return createElement(
    'span',
    { class: valueStyleClass },
    `${valueToUse}`,
  );
}
