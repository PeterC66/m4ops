<template>
  <section>
    <button
      class="button is-primary is-small"
      @click="showPortal({
        portalName: 'ModalForForms',
        title: '3B data',
        formId: formIdForThis,
        actionTextsArray: ['OK', 'OK2'],
      })"
    >
      Portal Form
    </button>
    <button
      class="button is-primary is-small"
      @click="isModalActive = true"
    >
      OLD B-modal
    </button>
    <button
      class="button is-primary is-small"
      @click="showPortal({
        portalName: 'ModalForMessages',
        title: 'Error Messages',
        messagesArray: ['Whatever', 'Hello World!', '23 The Avenue'],
      })"
    >
      Messages Form
    </button>
    <button
      class="button is-primary is-small"
      @click="showPortal({
        portalName: 'ModalForOPSForms',
        title: 'Hopefully 1B data',
        ldid: 'HcN>Local>Pubs',
        actionTextsArray: ['Save'],
      })"
    >
      Pubs Form
    </button>
    <button
      class="button is-primary is-small"
      @click="showPortal({
        portalName: 'ModalForOPSForms',
        title: 'Should be 1A data',
        ldid: 'HcN>Local>Census_entries',
        actionTextsArray: ['Save'],
      })"
    >
      Census Form
    </button>
    <button
      class="button is-primary is-small"
      @click="showPortal({
        portalName: 'ModalForOPSForms',
        title: 'Should be 2A data',
        ldid: 'HcN>Local>Testing_VFG',
        actionTextsArray: ['Save'],
      })"
    >
      VFG Form
    </button>

    <b-modal
      :active.sync="isModalActive"
    >
      <BModalForm />
    </b-modal>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BModalForm from '../../forms/BModalForm.vue';

export default {
  name: 'ActionsPane',
  components: {
    BModalForm,
  },
  data() {
    return {
      isModalActive: false,
      formIdForThis: '3B',
    };
  },
  computed: {
    ...mapGetters([
      'thisFormSpec',
    ]),
  },
  methods: {
    ...mapActions({ // was 'users', for namespace
      showPortal: 'showPortal',
    }),
  },
};
</script>

<style scoped>
  .button {margin-right: 2px; margin-top: 2px};
</style>
