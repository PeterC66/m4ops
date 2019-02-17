import fecha from 'fecha';
import {
  isNumber,
} from 'lodash';


// VFG functions from fieldInput.vue

const DATETIME_FORMATS = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  'datetime-local': 'YYYY-MM-DDTHH:mm:ss',
};

// eslint-disable-next-line import/prefer-default-export
export function formatDatetimeValueToField(value, inputType) {
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
