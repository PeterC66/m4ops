import {
  isUndefined,
  isFunction,
  isNull,
  isNumber,
} from 'lodash';
import tinycolor from 'tinycolor2';
import fecha from 'fecha';

export const NOTFOUND = 'Not found';
export const NO_VALUE = '-none-';

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

export function formatDateValueToField(value, inputType = 'date') {
  console.log(value, inputType);
  if (isUndefined(value) || isNull(value)) {
    return null;
  }

  const defaultFormat = DATETIME_FORMATS[inputType.toLowerCase()];
  // value is expected to be either milliseconds (number) or a general date string (including the defaultFormat)

  const m = isNumber(value) ? value : new Date(value);
  if (m.toString() !== 'Invalid Date') {
    return fecha.format(m, defaultFormat);
  }
  return value;
}

export function formatColorValueToField(value) {
  if (isUndefined(value) || isNull(value)) {
    return null;
  }
  const color = tinycolor(value);
  if (color.isValid()) {
    return { color: color.toHexString(), name: color.toString() };
  }
  return { color: '#000000', name: 'unknown' };
}
