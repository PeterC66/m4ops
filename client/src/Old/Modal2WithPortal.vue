<template>
  <portal
    to="Modal2WithPortal"
  >
    <div
      class="modal is-active"
    >
      <div
        class="modal-background"
        @click="hidePortal"
      />
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
      <button
        type="button"
        class="modal-close is-large"
        @click="hidePortal"
      />
    </div>
  </portal>
</template>

<script>
import { mapActions } from 'vuex';
import VueFormGenerator from 'vue-form-generator';
// Note import  of vfg.css etc is in main.js

export default {
  name: 'Modal2WithPortal',
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
/* Based on http://www.bootply.com/s6x5oKLiDG
.modal-header-M4OPS {
  padding:9px 15px;
  border-bottom:1px solid #eee;
  background-color: #729246;
  -webkit-border-top-left-radius: 5px;
  -webkit-border-top-right-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-topright: 5px;
   border-top-left-radius: 5px;
   border-top-right-radius: 5px;
}
.modal-title-M4OPS {color:#fff;}
.modal-body-M4OPS {background-color: #F8F8F8;}
.modal-footer-M4OPS {background-color: #EEF2E9;}
*/
</style>
