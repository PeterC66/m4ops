import Vue from 'vue';
import fecha from 'fecha';
import {
  find, isFunction, isNumber, isObject, toString,
} from 'lodash';

// VFG functions from fieldInput.vue

const DATETIME_FORMATS = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  'datetime-local': 'YYYY-MM-DDTHH:mm:ss',
};

function formatDatetimeValueToField(value, inputType) {
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

// Helpers

const NOTFOUND = 'Not found';

function valuesAsArray(values) {
  if (isFunction(values)) return values.apply();
  return values;
}

// Our functions

function stringValueDisplay(createElement, value, get, valueStyleClass) {
  const valueToUse = toString(get ? get(value) : value);
  return createElement(
    'span',
    { class: valueStyleClass },
    `${valueToUse}`,
  );
}

function stringValuesDisplay(createElement, values, get, valueStyleClass) {
  return values.map((value) => {
    const valueToUse = toString(get ? get(value) : value);
    return createElement(
      'p',
      { class: valueStyleClass },
      `${valueToUse}`,
    );
  });
}

function dateTimeValueDisplay(
  createElement,
  value,
  inputType,
  valueStyleClass,
) {
  const valueToUse = formatDatetimeValueToField(value, inputType);
  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}

function checkValueDisplay(createElement, value, valueStyleClass) {
  const boxTickedOrNot = value ? '&#9745;' : '&#9744;';
  return createElement(
    'span',
    { class: valueStyleClass },
    boxTickedOrNot,
  );
}

function radiosValueDisplay(
  createElement,
  value,
  values,
  radiosOptions,
  valueStyleClass,
) {
  let valueProperty = 'value';
  let nameProperty = 'name';

  if (radiosOptions) {
    if (radiosOptions.value) valueProperty = radiosOptions.value;
    if (radiosOptions.name) nameProperty = radiosOptions.name;
  }

  let valueToUse = 'N/A';
  const rowToUse = find(values, [valueProperty, value]);
  if (rowToUse) valueToUse = rowToUse[nameProperty];

  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}

function checklistValueDisplay(
  createElement,
  value, // is an array - so we return an array
  values,
  checklistOptions,
  valueStyleClass,
) {
  const valuesArray = valuesAsArray(values);

  if (!isObject(valuesArray[0])) {
    return value.map(
      valueToUse => stringValueDisplay( // TODO can also be boolean or number
        createElement,
        valueToUse,
        null,
        valueStyleClass,
      ),
    );
  }

  // Past here values must be objects with value and name properties)
  let valueProperty = 'value';
  let nameProperty = 'name';

  if (checklistOptions) {
    if (checklistOptions.value) valueProperty = checklistOptions.value;
    if (checklistOptions.name) nameProperty = checklistOptions.name;
  }
  const valuesToUse = value.map(
    (v) => {
      let nameToUse = NOTFOUND;
      const valuesObjectToUse = find(valuesArray, [valueProperty, v]);
      if (valuesObjectToUse && (nameProperty in valuesObjectToUse)) {
        nameToUse = valuesObjectToUse[nameProperty];
      }
      return nameToUse;
    },
  );
  return stringValuesDisplay(createElement, valuesToUse, null, valueStyleClass);
}

function selectValueDisplay(
  createElement,
  value,
  values,
  selectOptions,
  valueStyleClass,
) {
  let idProperty = 'id';
  let nameProperty = 'name';

  if (selectOptions) {
    if (selectOptions.value) idProperty = selectOptions.value;
    if (selectOptions.name) nameProperty = selectOptions.name;
  }

  let valueToUse = 'N/A';
  const rowToUse = find(values, [idProperty, value]);
  if (rowToUse) valueToUse = rowToUse[nameProperty];

  return stringValueDisplay(createElement, valueToUse, null, valueStyleClass);
}

function errorDisplay(createElement, type) {
  return stringValueDisplay(createElement, `Unknown type ${type}`);
}

export default Vue.component('FieldDisplay',
  {
    props: {
      field: { // Includes the vfg_schema for the field and its current 'value'
        type: Object,
        required: true,
      },
      nameStyleClass: {
        type: String,
        required: false,
        default: 'resultsName',
      },
      valueStyleClass: {
        type: String,
        required: false,
        default: 'resultsValue',
      },
    },
    render(createElement) {
      const {
        type,
        inputType,
        label,
        value,
        get,
        values,
        radiosOptions,
        selectOptions,
        checklistOptions,
      } = this.field;

      const fieldLabel = createElement(
        'span',
        { class: this.nameStyleClass },
        `${label}: `,
      );

      const fieldLabelAsHeader = createElement(
        'p',
        { class: this.nameStyleClass },
        `${label}: `,
      );

      let fieldValueDisplay = errorDisplay(createElement, type);

      // For Core fields see https://vue-generators.gitbook.io/vue-generators/fields/core-fields
      // For optional fields https://vue-generators.gitbook.io/vue-generators/fields/optional_fields [done on demand]
      switch (type) {
        case 'checkbox':
          fieldValueDisplay = checkValueDisplay(
            createElement,
            value,
            this.valueStyleClass,
          );
          break;
        case 'checklist':
          fieldValueDisplay = checklistValueDisplay(
            createElement,
            value,
            values,
            checklistOptions,
            this.valueStyleClass,
          );
          return createElement('div', [
            fieldLabelAsHeader,
            ...fieldValueDisplay,
          ]);
          // See https://vue-generators.gitbook.io/vue-generators/fields/core-fields/checklist
          // No need for break;
        case 'input':
        // See https://vue-generators.gitbook.io/vue-generators/fields/core-fields/input
        // We do not allow here for inputTypes that are better handled by other field types
          // See C:\projects\m4ops\client\node_modules\vue-form-generator\src\fields\core\fieldInput.vue
          switch (inputType.toLowerCase()) {
            case 'text':
            case 'url':
            case 'telephone':
            case 'e-mail':
            case 'password':
              fieldValueDisplay = stringValueDisplay(
                createElement,
                value,
                get,
                this.valueStyleClass,
              );
              break;
              // datetime deprecated in favour of "datetime-local", ignore Month, Week, Time
            case 'date':
            case 'datetime-local':
              fieldValueDisplay = dateTimeValueDisplay(
                createElement,
                value,
                inputType,
                this.valueStyleClass,
              );
              break;
            case 'number':
            case 'range':
              fieldValueDisplay = stringValueDisplay(
                createElement,
                toString(value),
                get,
                this.valueStyleClass,
              );
              break;
            case 'color': // TODO
              // eslint-disable-next-line max-len
              fieldValueDisplay = stringValueDisplay(createElement, toString(value), get, this.valueStyleClass);
              break;
            default:
              // eslint-disable-next-line no-console
              console.log('Problem in fVD', this.field);
          }
          break;
        case 'label':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            get,
            this.valueStyleClass,
          );
          break;
        case 'radios':
          fieldValueDisplay = radiosValueDisplay(
            createElement,
            value,
            values,
            radiosOptions,
            this.valueStyleClass,
          );
          break;
        case 'select':
          fieldValueDisplay = selectValueDisplay(
            createElement,
            value,
            values,
            selectOptions,
            this.valueStyleClass,
          );
          break;
        case 'textArea':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            this.valueStyleClass,
          );
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('Problem in fVD', this.field);
      }

      return createElement('p', [
        fieldLabel,
        fieldValueDisplay,
      ]);
    },
  });
