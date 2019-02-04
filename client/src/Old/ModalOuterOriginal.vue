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
        <form
          @submit.prevent="handleSubmit"
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
            <button class="button is-primary">
              Login
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
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      console.log('hS', this.model);
      const { username, password } = this.model;
      if (username && password) {
        this.login({ username, password });
      }
      this.hidePortal();
    },
  },
};
</script>

<style scoped>
</style>
