import {
  isFunction, toString,
} from 'lodash';

export const NOTFOUND = 'Not found';

export function valuesAsArray(values) {
  if (isFunction(values)) return values.apply();
  return values;
}

export function stringValueDisplay(
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

export function stringValuesDisplay(
  createElement,
  values,
  get,
  valueStyleClass,
) {
  return values.map((value) => {
    const valueToUse = toString(get ? get(value) : value);
    return createElement(
      'p',
      { class: valueStyleClass },
      `${valueToUse}`,
    );
  });
}
