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
  },
  computed: {
    fields() {
      // eslint-disable-next-line max-len
      const fieldsAndValues = this.schema.fields.map(field => ({ ...field, value: this.obj[field.model] }));
      // eslint-disable-next-line no-console
      console.log('F&V', fieldsAndValues, 'f', this.obj);
      return fieldsAndValues;
    },
  },
};
</script>

<style scoped>

</style>
