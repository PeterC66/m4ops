<template>
  <div>
    <SpecifiedField
      v-for="field in fields"
      :key="field.id"
      :field="field"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SpecifiedField from './SpecifiedField.vue';

export default {
  name: 'SpecifiedFields',
  components: {
    SpecifiedField,
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
      console.log('FF', opsForm.vfg_schema.fields, f);
      return fieldsAndValues;
    },
  },
};
</script>

<style scoped>

</style>
