<template>
  <section>
    <button
      class="button is-primary is-medium"
      @click="showPortal({title: '3B data', formId: formIdForThis})"
    >
      Portal Form
      <component :is="'ModalOuter'">
        <ModalInnerForForms :form-id="formIdForThis" />
        <span slot="footer">
          <button class="button is-primary">
            Login
          </button>
        </span>
      </component>
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
      <BModalForm />
    </b-modal>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import BModalForm from '../../forms/BModalForm.vue';
import ModalInnerForForms from '../../forms/ModalInnerForForms.vue';

export default {
  name: 'ActionsPane',
  components: {
    BModalForm,
    ModalInnerForForms,
  },
  data() {
    return {
      isModalActive: false,
      formIdForThis: '3B',
    };
  },
  methods: {
    ...mapActions({ // was 'users', for namespace
      showPortal: 'showPortal',
    }),
  },
};
</script>
