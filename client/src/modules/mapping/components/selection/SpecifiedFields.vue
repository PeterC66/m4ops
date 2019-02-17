<template>
  <div>
    <FieldDisplayContainer
      :schema="schema"
      :obj="obj"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import FieldDisplayContainer from './fielddisplay/FieldDisplayContainer.vue';

export default {
  name: 'SpecifiedFields',
  components: {
    FieldDisplayContainer,
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
  },
};
</script>

<style scoped>

</style>
