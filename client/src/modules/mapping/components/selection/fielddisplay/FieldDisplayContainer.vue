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

export default {
  name: 'FieldDisplayContainer',
  components: {
    FieldDisplay,
  },
  props: {
    schema: {
      type: Object,
      required: true,
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
    },
  },
};
</script>

<style scoped>

</style>
