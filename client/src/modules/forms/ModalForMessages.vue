<template>
  <portal
    v-if="usePortal()"
    to="ModalForMessages"
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
          <section class="modal-card-body">
            <table style="width:100%">
              <tr
                v-for="(message, index) in messagesArray"
                :key="index"
              >
                <td>
                  {{ message }}
                </td>
              </tr>
            </table>
          </section>
        </main>
        <footer class="modal-card-foot">
          <button
            v-for="bText in actionTextsArray"
            :key="bText"
            class="button is-primary is-small"
          >
            {{ bText }}
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
  name: 'ModalForMessages',
  computed: {
    ...mapState({
      title: state => state.forms.title,
      actionTextsArray: state => state.forms.actionTextsArray,
      messagesArray: state => state.forms.messagesArray,
    }),
  },
  methods: {
    ...mapActions({
      hidePortal: 'hidePortal',
    }),
    usePortal() {
      return this.title !== NOPORTAL;
    },
  },
};
</script>

<style scoped>
</style>
