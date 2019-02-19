import {
  isNil,
  isFunction,
  isNumber,
} from 'lodash';
import tinycolor from 'tinycolor2';
import fecha from 'fecha';
import { isNull } from 'util';

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
  if (isNil(value)) return null;

  const defaultFormat = DATETIME_FORMATS[inputType.toLowerCase()]
    || DATETIME_FORMATS.date;

  let ms;
  if (isNumber(value)) { // value is expected to be either the standard milliseconds after January 1st 1970 (a number)
    ms = value;
  } else {
    ms = fecha.parse(value, defaultFormat); // ... or a date string in the defaultFormat (eg '1955-11-06')
    console.log(value, 'ms', ms);
    if (isNull(ms)) {
      ms = new Date(value);// ... or a general date string (eg '1998' or '2nd January 1892')
    }
  }
  if (ms.toString() !== 'Invalid Date') {
    return fecha.format(ms, defaultFormat);
  }
  return value;
}

export function formatColorValueToField(value) {
  if (isNil(value)) {
    return null;
  }
  const color = tinycolor(value);
  if (color.isValid()) {
    return { color: color.toHexString(), name: color.toString() };
  }
  return { color: '#000000', name: 'unknown' };
}
