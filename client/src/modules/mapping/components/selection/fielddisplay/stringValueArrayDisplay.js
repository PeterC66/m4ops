import {
  isFunction,
  isUndefined,
  toString,
} from 'lodash';

import { NO_VALUE } from './helpers';

export default function stringValueArrayDisplay(
  createElement,
  valueArray,
  get,
  valueStyleClass = '',
) {
  if (isUndefined(valueArray)) return null;

  let valueArrayToUse = [NO_VALUE];
  valueArrayToUse = valueArray.map((value) => {
    const valueToUse = toString(isFunction(get) ? get(value) : value);
    return createElement(
      'p',
      { class: valueStyleClass },
      `${valueToUse}`,
    );
  });
  return valueArrayToUse;
}
