<template>
  <section>
    <button
      class="button is-primary is-medium"
      @click="showPortal('Modal2WithPortal')"
    >
      Launch Portal Form
      <component :is="'Modal2WithPortal'"></component>
    </button>
    <button
      class="button is-primary is-medium"
      @click="isComponent2ModalActive = true"
    >
      Launch standard modal
    </button>

    <b-modal
      :active.sync="isComponent2ModalActive"
    >
      <ModalForm />
    </b-modal>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import ModalForm from '../../forms/ModalForm.vue';
import Modal2WithPortal from '../../forms/Modal2WithPortal.vue';

export default {
  name: 'ActionsPane',
  components: {
    ModalForm,
    Modal2WithPortal,
  },
  data() {
    return {
      isComponent2ModalActive: false,
    };
  },
  methods: {
    ...mapActions({ // was 'users', for namespace
      showPortal: 'showPortal',
    }),
  },
};
</script>
