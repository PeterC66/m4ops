<template>
  <portal
    v-if="usePortal()"
    to="ModalForForms"
  >
    <div
      class="modal is-active"
    >
      <div
        class="modal-background"
        @click="hidePortal"
      />
      <div
        class="modal-card"
        style="overflow:auto;"
      >
        <form
          @submit.prevent="handleSubmit"
        >
          <header class="modal-card-head">
            {{ title }}
          </header>
          <main>
            <section class="modal-card-body">
              <vue-form-generator
                :schema="thisFormSpec.vfg_schema"
                :model="thisFormSpec.vfg_model"
                :options="thisFormSpec.vfg_formOptions"
              />
            </section>
          </main>
          <footer class="modal-card-foot">
            <button
              v-for="bText in actionTextsArray"
              :key="bText"
              class="button is-primary is-small"
            >
              {{ bText }}
            </button>
            <slot name="footer" />
            <button
              class="button"
              type="button"
              @click="hidePortal"
            >
              Close
            </button>
          </footer>
        </form>
        <button
          type="button"
          class="modal-close is-large"
          @click="hidePortal"
        />
      </div>
    </div>
  </portal>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import VueFormGenerator from 'vue-form-generator';
// Note import  of vfg.css etc is in main.js
import { NOPORTAL } from '../../global/constants';

export default {
  name: 'ModalForForms',
  components: {
    'vue-form-generator': VueFormGenerator.component,
  },
  computed: {
    ...mapState({
      title: state => state.forms.title,
      formId: state => state.forms.formId,
      actionTextsArray: state => state.forms.actionTextsArray,
    }),
    ...mapGetters([
      'thisFormSpec',
    ]),
  },
  methods: {
    ...mapActions({
      hidePortal: 'hidePortal',
      login: 'login',
    }),
    usePortal() {
      return this.title !== NOPORTAL;
    },
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      // console.log('HS', this.formId, this.thisFormSpec);
      // We are not expert enough to pass functions as props or etc
      switch (this.formId) {
        case 'LogIn':
        { const { username, password } = this.thisFormSpec.vfg_model;
          if (username && password) {
            this.login({ username, password });
          }
          break;
        }
        default:
          // eslint-disable-next-line no-console
          console.log('handleSubmit, unknown formId', this.formId);
      }
      this.hidePortal();
    },
  },
};
</script>

<style scoped>
</style>
