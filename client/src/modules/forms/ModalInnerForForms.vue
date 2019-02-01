<template>
  <form
    action=""
    class="modal-content"
  >
    <div
      class="modal-card"
      style="width: auto"
    >
      <header class="modal-header-M4OPS">
        <p class="modal-title-M4OPS">
          Login
        </p>
      </header>
      <section class="modal-card-body modal-body-M4OPS">
        <form style="background-color:white">
          <vue-form-generator
            :schema="schema"
            :model="model"
            :options="formOptions"
          />
        </form>
      </section>
      <footer class="modal-card-foot modal-footer-M4OPS">
        <button
          class="button"
          type="button"
          @click="hidePortal"
        >
          Close
        </button>
        <button class="button is-primary">
          Login
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import VueFormGenerator from 'vue-form-generator';
// Note import  of vfg.css etc is in main.js

// import { model, schema, formOptions } from './form3BSpec';

export default {
  name: 'ModalInnerForForms',
  components: {
    'vue-form-generator': VueFormGenerator.component,
  },
  props: {
    formData: {
      type: Object,
      default: () => ({
        model: {},
        schema: {
          fields: [],
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true,
        },
      }),
    },
  },
  data() {
    return {
      model: this.formData.model,
      schema: this.formData.schema,
      formOptions: this.formData.formOptions,
    };
  },
  methods: {
    ...mapActions([
      'hidePortal',
    ]),
  },
};
</script>

<style scoped>
</style>
