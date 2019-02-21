<template>
  <div>
    <field-display-container
      :schema="schema"
      :obj="obj"
      :options="options"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FieldDisplayContainer
  from '../../../../../../../field-display/src/fieldDisplayContainer.vue';

export default {
  name: 'SpecifiedFields',
  components: {
    'field-display-container': FieldDisplayContainer,
  },
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        stylePrefix: 'results',
        showNulls: false,
        fieldsOptions: {
          shorttext: { hidden: true },
          ldid: { hidden: true },
        },
      },
    };
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
  },
};
</script>

<style scoped>

</style>
