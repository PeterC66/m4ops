<template>
  <section>
    <button
      class="button is-primary is-medium"
      @click="isComponent1ModalActive = true"
    >
      Launch Sample Form
    </button>
    <button
      class="button is-primary is-medium"
      @click="isComponent2ModalActive = true"
    >
      Launch standard modal
    </button>

    <b-modal
      :active.sync="isComponent1ModalActive"
    >
      <!-- Note that property has-modal-card causes problems -->
      <SampleForm />
    </b-modal>
    <b-modal
      :active.sync="isComponent2ModalActive"
    >
      <ModalForm />
    </b-modal>
  </section>
</template>

<script>
import SampleForm from '../../forms/sample.vue';
import ModalForm from '../../forms/ModalForm.vue';

export default {
  name: 'ActionsPane',
  components: {
    SampleForm,
    ModalForm,
  },
  data() {
    return {
      isComponent1ModalActive: false,
      isComponent2ModalActive: false,
    };
  },
};
</script>
