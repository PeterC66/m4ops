import Vue from 'vue';
import {
  toString,
} from 'lodash';

import {
  stringValueDisplay,
} from './helpers';
import dateTimeValueDisplay from './dateTimeValueDisplay';
import checkboxValueDisplay from './checkboxValueDisplay';
import radiosValueDisplay from './radiosValueDisplay';
import checklistValueDisplay from './checklistValueDisplay';
import selectValueDisplay from './selectValueDisplay';

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
      fieldDisplayOptions: {
        type: Object,
        required: false,
        default: () => ({
          nameStyleClass: 'resultsName',
          valueStyleClass: 'resultsValue',
        }),
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
        fieldOptions,
      } = this.field;

      const {
        nameStyleClass,
        valueStyleClass,
        hidden,
      } = fieldOptions;

      if (hidden) return null;

      const fieldLabel = createElement(
        'span',
        { class: nameStyleClass },
        `${label}: `,
      );

      const fieldLabelAsHeader = createElement(
        'p',
        { class: nameStyleClass },
        `${label}: `,
      );

      let fieldValueDisplay = errorDisplay(createElement, type);

      // For Core fields see https://vue-generators.gitbook.io/vue-generators/fields/core-fields
      // For optional fields https://vue-generators.gitbook.io/vue-generators/fields/optional_fields [done on demand]
      switch (type) {
        case 'checkbox':
          fieldValueDisplay = checkboxValueDisplay(
            createElement,
            value,
            valueStyleClass,
          );
          break;
        case 'checklist':
          fieldValueDisplay = checklistValueDisplay(
            createElement,
            value,
            values,
            checklistOptions,
            valueStyleClass,
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
                valueStyleClass,
              );
              break;
              // datetime deprecated in favour of "datetime-local", ignore Month, Week, Time
            case 'date':
            case 'datetime-local':
              fieldValueDisplay = dateTimeValueDisplay(
                createElement,
                value,
                inputType,
                valueStyleClass,
              );
              break;
            case 'number':
            case 'range':
              fieldValueDisplay = stringValueDisplay(
                createElement,
                toString(value),
                get,
                valueStyleClass,
              );
              break;
            case 'color': // TODO
              // eslint-disable-next-line max-len
              fieldValueDisplay = stringValueDisplay(createElement, toString(value), get, valueStyleClass);
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
            valueStyleClass,
          );
          break;
        case 'radios':
          fieldValueDisplay = radiosValueDisplay(
            createElement,
            value,
            values,
            radiosOptions,
            valueStyleClass,
          );
          break;
        case 'select':
          fieldValueDisplay = selectValueDisplay(
            createElement,
            value,
            values,
            selectOptions,
            valueStyleClass,
          );
          break;
        case 'textArea':
          fieldValueDisplay = stringValueDisplay(
            createElement,
            value,
            valueStyleClass,
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
