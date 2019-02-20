<template>
  <portal
    v-if="usePortal()"
    to="ModalForOPSForms"
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
                :schema="getOPSFormByLdid(ldid).vfg_schema"
                :model="vfg_model"
                :options="getOPSFormByLdid(ldid).vfg_formOptions"
              />
            </section>
          </main>
          <footer class="modal-card-foot">
            <button
              v-for="buttonText in actionTextsArray"
              :key="buttonText"
              class="button is-primary is-small"
            >
              {{ buttonText }}
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
import _ from 'lodash';
import { mapState, mapActions, mapGetters } from 'vuex';
import VueFormGenerator from 'vue-form-generator';
// Note import  of vfg.css etc is in main.js
import { NOPORTAL } from '../../global/constants';

export default {
  name: 'ModalForOPSForms',
  components: {
    'vue-form-generator': VueFormGenerator.component,
  },
  data() {
    return {
      vfg_model: {},
    };
  },
  computed: {
    ...mapState({
      title: state => state.forms.title,
      ldid: state => state.forms.ldid,
      actionTextsArray: state => state.forms.actionTextsArray,
    }),
    ...mapGetters([
      'getOPSFormByLdid',
    ]),
  },
  watch: {
    ldid(newVal) { // , oldVal
      if (newVal) {
        this.vfg_model = _.cloneDeep(this.getOPSFormByLdid(newVal).vfg_model);
      } else {
        this.vfg_model = {};
      }
    },
  },
  methods: {
    ...mapActions({
      hidePortal: 'hidePortal',
    }),
    usePortal() {
      return this.title !== NOPORTAL;
    },
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      // eslint-disable-next-line no-console
      console.log(`Data for:${this.ldid}`, this.vfg_model);
      this.hidePortal();
    },
  },
};
</script>

<style scoped>
</style>
