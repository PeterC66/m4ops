import Vue from 'vue';
import _ from 'lodash';
import fecha from 'fecha';

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
  if (!_.isNumber(value)) {
    m = fecha.parse(value, defaultFormat);
  }
  if (m !== false) {
    return fecha.format(m, defaultFormat);
  }
  return value;
}

// Our functions

function textValueDisplay(createElement, value, get, valueStyleClass) {
  const valueToUse = get ? get(value) : value;
  return createElement(
    'span',
    { class: valueStyleClass },
    `${valueToUse}`,
  );
}

function dateTimeValueDisplay(
  createElement,
  value,
  inputType,
  valueStyleClass,
) {
  const valueToUse = formatDatetimeValueToField(value, inputType);
  return textValueDisplay(createElement, valueToUse, null, valueStyleClass);
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
  const rowToUse = _.find(values, [valueProperty, value]);
  if (rowToUse) valueToUse = rowToUse[nameProperty];

  return textValueDisplay(createElement, valueToUse, null, valueStyleClass);
}

function checklistValueDisplay(
  createElement,
  value, // is an array - so return an array
  values,
  checklistOptions,
  valueStyleClass,
) {
  const v0 = _.isFunction(values) ? values(0) : values[0];

  if (_.isString(v0)) {
    return value.map(
      valueToUse => textValueDisplay(
        createElement,
        valueToUse,
        null,
        valueStyleClass,
      ),
    );
  }
  // Past here values must be an array (function) 
  let valueProperty = 'value';
  let nameProperty = 'name';

  if (checklistOptions) {
    if (checklistOptions.value) valueProperty = checklistOptions.value;
    if (checklistOptions.name) nameProperty = checklistOptions.name;
  }

  let valueToUse = 'N/A';
  const rowToUse = _.find(values, [valueProperty, value]);
  if (rowToUse) valueToUse = rowToUse[nameProperty];

  return textValueDisplay(createElement, valueToUse, null, valueStyleClass);
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
  const rowToUse = _.find(values, [idProperty, value]);
  if (rowToUse) valueToUse = rowToUse[nameProperty];

  return textValueDisplay(createElement, valueToUse, null, valueStyleClass);
}

function errorDisplay(createElement, type) {
  return textValueDisplay(createElement, `Unknown type ${type}`);
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
              fieldValueDisplay = textValueDisplay(
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
              fieldValueDisplay = textValueDisplay(
                createElement,
                _.toString(value),
                get,
                this.valueStyleClass,
              );
              break;
            case 'color': // TODO
              // eslint-disable-next-line max-len
              fieldValueDisplay = textValueDisplay(createElement, _.toString(value), get, this.valueStyleClass);
              break;
            default:
              // eslint-disable-next-line no-console
              console.log('Problem in fVD', this.field);
          }
          break;
        case 'label':
          fieldValueDisplay = textValueDisplay(
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
          fieldValueDisplay = textValueDisplay(
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
