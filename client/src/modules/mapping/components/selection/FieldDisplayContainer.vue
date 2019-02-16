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
import { mapGetters } from 'vuex';

import FieldDisplay from './FieldDisplay';

export default {
  name: 'FieldDisplayContainer',
  components: {
    FieldDisplay,
  },
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'getOPSFormByLdid',
    ]),
    fields() {
      // eslint-disable-next-line max-len
      const opsForm = this.getOPSFormByLdid(this.feature.properties.ldid);
      const f = this.feature;
      // eslint-disable-next-line max-len
      const fieldsAndValues = opsForm.vfg_schema.fields.map(field => ({ ...field, value: f.properties[field.model] }));
      // eslint-disable-next-line no-console
      console.log('F&V', fieldsAndValues, 'f', f);
      return fieldsAndValues;
    },
  },
};
</script>

<style scoped>

</style>
