<template>
  <section>
    <button
      class="button is-primary is-medium"
      @click="showPortal('ModalOuter')"
    >
      Portal Form
      <!-- This component might as well be here as anywhere else.
        It displays in the portal -->
      <component :is="'ModalOuter'">
        <ModalInnerForForms :form-data="formData" />
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
      <ModalForm />
    </b-modal>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import ModalForm from '../../forms/ModalForm.vue';
import ModalInnerForForms from '../../forms/ModalInnerForForms.vue';
import formData from '../../forms/form3BSpec';

export default {
  name: 'ActionsPane',
  components: {
    ModalForm,
    ModalInnerForForms,
  },
  data() {
    return {
      isModalActive: false,
    };
  },
  computed: {
    formData() {
      return formData;
    },

  },
  methods: {
    ...mapActions({ // was 'users', for namespace
      showPortal: 'showPortal',
    }),
  },
};
</script>
