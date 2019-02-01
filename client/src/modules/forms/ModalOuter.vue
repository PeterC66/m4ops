<template>
  <portal
    to="ModalOuter"
  >
    <div
      class="modal is-active"
    >
      <div
        class="modal-background"
        @click="hidePortal"
      />
      <slot />
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

export default {
  name: 'ModalOuter',
  methods: {
    ...mapActions([
      'hidePortal',
    ]),
  },
};
</script>

<style scoped>
</style>
