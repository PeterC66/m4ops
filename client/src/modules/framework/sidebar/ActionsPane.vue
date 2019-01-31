<template>
  <section>
    <button
      class="button is-primary is-medium"
      @click="showPortal('Modal2WithPortal')"
    >
      Portal Form
      <component :is="'Modal2WithPortal'" />
    </button>
    <button
      class="button is-primary is-medium"
      @click="isModalActive = true"
    >
      OLD B-modal
    </button>

    <b-modal
      :active.sync="isModalActive"
    >
      <ModalForm />
    </b-modal>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import ModalForm from '../../forms/ModalForm.vue';

export default {
  name: 'ActionsPane',
  components: {
    ModalForm,
  },
  data() {
    return {
      isModalActive: false,
    };
  },
  methods: {
    ...mapActions({ // was 'users', for namespace
      showPortal: 'showPortal',
    }),
  },
};
</script>
