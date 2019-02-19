import {
  isFunction,
  isNumber,
} from 'lodash';
import tinycolor from 'tinycolor2';
import fecha from 'fecha';

export const NOTFOUND = 'Not found';
export const NO_VALUE = 'No value';

export function valuesAsArray(values) {
  if (isFunction(values)) return values.apply();
  return values;
}

// Based on VFG helper

const DATETIME_FORMATS = {
  year: 'YYYY',
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  'datetime-local': 'YYYY-MM-DDTHH:mm:ss',
};

export function formatDateValueToField(value, inputType) {
  if (value === null || undefined === value) {
    return null;
  }

  const defaultFormat = DATETIME_FORMATS[inputType.toLowerCase()];
  let m = value;
  if (!isNumber(value)) {
    m = fecha.parse(value, defaultFormat);
  }
  if (m !== false) {
    return fecha.format(m, defaultFormat);
  }
  return value;
}

export function formatColorValueToField(value) {
  if (value === null || undefined === value) {
    return null;
  }
  const color = tinycolor(value);
  if (color.isValid()) {
    return color.toHexString();
  }
  return '#000000'; // black
}
