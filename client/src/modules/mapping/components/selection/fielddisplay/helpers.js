import {
  isFunction,
} from 'lodash';

export const NOTFOUND = 'Not found';

export function valuesAsArray(values) {
  if (isFunction(values)) return values.apply();
  return values;
}
