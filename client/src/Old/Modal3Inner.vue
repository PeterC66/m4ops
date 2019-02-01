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

export default {
  name: 'Modal3Inner',
  components: {
    'vue-form-generator': VueFormGenerator.component,
  },
  data() {
    return {

      model: {
        id: 1,
        name: '',
        address: '',
        comment: '',
      },

      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'ID (disabled text field)',
            model: 'id',
            readonly: true,
            disabled: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            placeholder: 'Name',
            required: true,
            hint: 'The name of the feature',
            help: 'A short name',
            validator: 'string',
            description: 'PDC non-VFG property',
          },
          {

            type: 'input',
            inputType: 'text',
            label: 'Address',
            model: 'address',
            placeholder: 'Address',
            required: true,
            help: 'The address of the feature',
            validator: 'string',
            description: 'PDC non-VFG property',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Comment',
            model: 'comment',
            placeholder: 'Name',
            required: false,
            help: 'Enter any comment here',
            validator: 'string',
            description: 'Any comment about the feature',
          },
        ],
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },
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
