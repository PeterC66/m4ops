import Vue from 'vue';
import {
  isNull,
  isNil,
} from 'lodash';

import dateTimeValueDisplay from './dateTimeValueDisplay';
import checkboxValueDisplay from './checkboxValueDisplay';
import radiosValueDisplay from './radiosValueDisplay';
import checklistValueArrayDisplay from './checklistValueArrayDisplay';
import selectValueDisplay from './selectValueDisplay';
import stringValueDisplay from './stringValueDisplay';
import stringValueArrayDisplay from './stringValueArrayDisplay';
import ColorValueDisplay from './ColorValueDisplay';
import {
  NO_VALUE,
} from './helpers';

function errorDisplay(createElement, type) {
  return stringValueDisplay(createElement, `Unknown field type "${type}"`);
}

export default Vue.component('FieldDisplay',
  {
    props: {
      field: { // Includes the vfg_schema for the field and its current 'value'
        type: Object,
        required: true,
      },
    },
    render(createElement) {
      const {
        type,
        inputType,
        key,
        label,
        value,
        get,
        values = [],
        radiosOptions = {},
        selectOptions = {},
        checklistOptions = {},
        fieldOptions = {},
      } = this.field;

      const {
        stylePrefix = '',
        showNulls = true,
        hidden = false,
      } = fieldOptions;

      if (isNil(value) || isNil(type)) return null;
      if (hidden) return null;

      const labelToUse = label || key || 'Unknown';

      // First deal with those that need multiple lines for display, hence their displays return an array
      let fieldValueArrayDisplay = [];
      if (['checklist'].includes(type)) {
        const fieldLabelAsHeader = createElement(
          'p',
          { class: `${stylePrefix}ListName` },
          `${labelToUse}: `,
        );

        switch (type) {
          case 'checklist':
            fieldValueArrayDisplay = checklistValueArrayDisplay(
              createElement,
              value,
              values,
              checklistOptions,
              `${stylePrefix}ListValue`,
            );
            break;
          default:
          // eslint-disable-next-line no-console
            console.log('Problem in fVDA', this.field);
        }
        if (isNull(fieldValueArrayDisplay)) {
          if (!showNulls) return null;
          fieldValueArrayDisplay = stringValueArrayDisplay(
            createElement,
            [NO_VALUE],
            null,
            `${stylePrefix}ListValue`,
          );
        }
        return createElement('div', [
          fieldLabelAsHeader,
          ...fieldValueArrayDisplay,
        ]);
      }

      // Now we deal with those that need only one line for display
      if (!showNulls && (isNil(value) || value === '')) return null;

      let fieldValueDisplay = errorDisplay(createElement, type);
      const fieldLabel = createElement(
        'span',
        { class: `${stylePrefix}Name` },
        `${labelToUse}: `,
      );

      // For Core fields see https://vue-generators.gitbook.io/vue-generators/fields/core-fields
      // For optional fields https://vue-generators.gitbook.io/vue-generators/fields/optional_fields [done on demand]
      switch (type) {
        case 'checkbox':
          if (!showNulls && !value) return null;
          fieldValueDisplay = checkboxValueDisplay(
            createElement,
            value,
            `${stylePrefix}Value`,
          );
          break;
        case 'input':
          // See https://vue-generators.gitbook.io/vue-generators/fields/core-fields/input
          // We do not allow here for inputTypes that are better handled by other field types
          // See ...\vue-form-generator\src\fields\core\fieldInput.vue
          switch (inputType.toLowerCase()) {
            case 'text':
            case 'url':
            case 'telephone':
            case 'e-mail':
            case 'password':
            case 'number': // stringValueDisplay handles formatting
            case 'range':
              fieldValueDisplay = stringValueDisplay(
                createElement,
                value,
                get,
                `${stylePrefix}Value`,
              );
              break;
              // ignore datetime (deprecated in favour of "datetime-local"), Month, Week, and Time
            case 'date':
            case 'datetime-local':
              fieldValueDisplay = dateTimeValueDisplay(
                createElement,
                value,
                inputType,
                `${stylePrefix}Value`,
              );
              break;
            case 'color':
              // eslint-disable-next-line max-len
              fieldValueDisplay = ColorValueDisplay(
                createElement,
                value,
                `${stylePrefix}Value`,
              );
              break;
            default:
              // eslint-disable-next-line no-console
              console.log('Problem in fVDB', this.field);
          }
          break;
        case 'label':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            get,
            `${stylePrefix}Value`,
          );
          break;
        case 'radios':
          fieldValueDisplay = radiosValueDisplay(
            createElement,
            value,
            values,
            radiosOptions,
            `${stylePrefix}Value`,
          );
          break;
        case 'select':
          fieldValueDisplay = selectValueDisplay(
            createElement,
            value,
            values,
            selectOptions,
            `${stylePrefix}Value`,
          );
          break;
        case 'textArea':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            get,
            `${stylePrefix}Value`,
          );
          break;
        case 'unknown':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            get,
            `${stylePrefix}Value`,
          );
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('Problem in fVDC', this.field);
      }

      if (showNulls || !isNull(fieldValueDisplay)) {
        return createElement('p', [
          fieldLabel,
          fieldValueDisplay,
        ]);
      }
      return null;
    },
  });
