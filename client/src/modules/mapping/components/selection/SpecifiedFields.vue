<template>
  <div>
    <field-display-container
      :schema="schema"
      :obj="obj"
      :field-display-container-options="fieldDisplayContainerOptions"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import VueFormGenerator from 'vue-form-generator';

export default {
  name: 'SpecifiedFields',
  components: {
    'field-display-container': VueFormGenerator.fieldDisplay,
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
    schema() {
      // eslint-disable-next-line max-len
      return this.getOPSFormByLdid(this.feature.properties.ldid).vfg_schema;
    },
    obj() {
      return this.feature.properties;
    },
    fieldDisplayContainerOptions() {
      return {
        stylePrefix: 'results',
        showNulls: false,
        fieldsOptions: {
          shorttext: { hidden: true },
          ldid: { hidden: true },
        },
      };
    },
  },
};
</script>

<style scoped>

</style>
