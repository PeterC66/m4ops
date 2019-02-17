import {
  toString,
} from 'lodash';

export default function stringValuesDisplay(
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
