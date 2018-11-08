<template>
  <div id="buttonsR1">

    <p class="buttons">
      <b-tooltip
        label="Return to the original One-Place Study location"
        position="is-left"
        multilined>
        <button
          class="button is-primary"
          @click="goHome()">
          <span class="icon">
            <font-awesome-icon icon="home"/>
          </span>
        </button>
      </b-tooltip>
      <b-tooltip
        label="Contact the person responsible for this study"
        position="is-left"
        multilined>
        <button
          class="button is-primary"
          @click="tellMe()">
          <span class="icon">
            <font-awesome-icon :icon="['far','envelope']"/>
          </span>
        </button>
      </b-tooltip>
      <b-tooltip
        label="Provide feedback to the person responsible for M4OPS
          within the Society for One-Place Studies"
        position="is-left"
        multilined>
        <a
          class="button is-primary"
          href="mailto:peter.cooper@one-place-studies.org?subject=M4OPS">
          <font-awesome-icon :icon="['fas','envelope']"/>
        </a>
      </b-tooltip>
      <b-tooltip
        label="See the Help documentation"
        position="is-left"
        multilined>
        <button
          class="button is-primary"
          @click="tellMe()">
          <span class="icon">
            <font-awesome-icon icon="question-circle"/>
          </span>
        </button>
      </b-tooltip>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { useVuexForView } from '../../../global/constants';

// import './Header.css';

export default {
  name: 'HeaderR1',
  computed: {
    ...mapGetters([
      'homeView',
    ]),
  },
  methods: {
    tellMe() {
      console.log('tellMe');
    },
    goHome() {
      // eslint-disable-next-line max-len
      if (!useVuexForView) console.log('Remember that useVuexForView is false so GoHome button will not work');
      this.$store.dispatch('updateView', this.homeView);
    },
  },
};
</script>

<style scoped lang="scss">
  .button {margin: 0, 0.5rem};
</style>
