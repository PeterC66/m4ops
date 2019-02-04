<template>
  <section class="modal-card-body">
    <vue-form-generator
      :schema="thisFormSpec.vfg_schema"
      :model="thisFormSpec.vfg_model"
      :options="thisFormSpec.vfg_formOptions"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import VueFormGenerator from 'vue-form-generator';
// Note import  of vfg.css etc is in main.js

export default {
  name: 'ModalInnerForForms',
  components: {
    'vue-form-generator': VueFormGenerator.component,
  },
  props: {
    formId: {
      type: String,
      required: true,
      // default: '3B',
    },
  },
  computed: {
    ...mapGetters([
      'thisFormSpec',
    ]),
  },
};
</script>

<style scoped>
</style>
