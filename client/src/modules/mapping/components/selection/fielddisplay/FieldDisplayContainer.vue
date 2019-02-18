<template>
  <div>
    <FieldDisplay
      v-for="field in fields"
      :key="field.id"
      :field="field"
    />
  </div>
</template>

<script>
import FieldDisplay from './FieldDisplay';
import { isNonemptyArray } from '../../../../../global/utils';

export default {
  name: 'FieldDisplayContainer',
  components: {
    FieldDisplay,
  },
  props: {
    schema: {
      type: Object,
      required: false,
      default: () => ({
        fields: [],
      }),
    },
    obj: {
      type: Object,
      required: true,
    },
    fieldDisplayContainerOptions: {
      type: Object,
      required: false,
      default: () => ({
        nameStyleClass: 'resultsName',
        valueStyleClass: 'resultsValue',
        fieldsOptions: [],
      }),
    },
  },
  computed: {
    fields() {
      const {
        nameStyleClass,
        valueStyleClass,
        fieldsOptions,
      } = this.fieldDisplayContainerOptions;
      if (isNonemptyArray(this.schema.fields)) {
        const fieldsAndValues = this.schema.fields.map(field => ({
          ...field,
          value: this.obj[field.model],
          fieldOptions: {
            ...fieldsOptions[field.model],
            nameStyleClass,
            valueStyleClass,
          },
        }));
        // eslint-disable-next-line no-console
        console.log('F&V', fieldsAndValues, 'f', this.obj);
        return fieldsAndValues;
      }
      const fieldsAndValues = Object.keys(this.obj).map(key => ({
        type: 'unknown',
        label: key,
        value: this.obj[key],
        fieldOptions: {
          ...fieldsOptions[key],
          nameStyleClass,
          valueStyleClass,
        },
      }));
      // eslint-disable-next-line no-console
      console.log('F&VAll', fieldsAndValues, 'f', this.obj);
      return fieldsAndValues;
    },
  },
};
</script>

<style scoped>

</style>
