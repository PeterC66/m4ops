<template>
  <portal
    v-if="usePortal()"
    to="ModalOuter"
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
      >
        <header class="modal-card-head">
          {{ title }}
        </header>
        <main>
          <slot>
            <p> Unknown content</p>
          </slot>
        </main>
        <footer class="modal-card-foot">
          <button
            class="button"
            type="button"
            @click="hidePortal"
          >
            Close
          </button>
          <slot name="footer" />
        </footer>
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
import { mapState, mapActions } from 'vuex';
import { NOPORTAL } from '../../global/constants';

export default {
  name: 'ModalOuter',
  computed: {
    ...mapState({
      title: state => state.forms.title,
    }),
  },
  methods: {
    ...mapActions([
      'hidePortal',
    ]),
    usePortal() {
      return this.title !== NOPORTAL;
    },
  },
};
</script>

<style scoped>
</style>
