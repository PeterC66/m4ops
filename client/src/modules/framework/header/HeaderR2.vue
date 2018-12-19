<template>
  <div
    id="buttonsR2"
    class="level"
  >
    <div
      v-if="!interactionsOn"
      class="level-right"
    >
      <b-tooltip
        label="Unfreeze everything"
        position="is-left"
        multilined
      >
        <button
          class="button is-info is-normal"
          @click="toggleInteractions()"
        >
          Unfreeze
        </button>
      </b-tooltip>
    </div>
    <div
      v-else
      class="level-right"
    >
      <b-tooltip
        label="Freeze things"
        position="is-left"
        multilined
      >
        <button
          class="button is-primary is-small"
          @click="toggleInteractions()"
        >
          <span class="icon">
            <font-awesome-icon :icon="['fas','search']" />
          </span>
        </button>
      </b-tooltip>
      <b-tooltip
        label="Feature search text,
        or coordinates to go to."
        position="is-bottom"
        multilined
      >
        <b-field>
          <b-input
            v-model="formInline.textForSearchOrCoords"
            size="is-small"
            placeholder="Text or Coords to GoTo"
          />
        </b-field>
      </b-tooltip>
      <b-tooltip
        label="GoTo as specified"
        position="is-left"
        multilined
      >
        <button
          class="button is-primary is-small"
          @click="tellMe()"
        >
          <span class="icon">
            <font-awesome-icon :icon="['fas','search']" />
          </span>
        </button>
      </b-tooltip>
      <b-tooltip
        label="Make the current view of M4OPS available as a URL to copy"
        position="is-left"
        multilined
      >
        <button
          class="button is-primary is-small"
          @click="tellMe()"
        >
          <span class="icon">
            <font-awesome-icon :icon="['far','clone']" />
          </span>
        </button>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HeaderR2',
  data() {
    return {
      formInline: {
        textForSearchOrCoords: '',
      },
    };
  },
  computed: {
    ...mapState({
      interactionsOn: state => state.framework.interactionsOn,
    }),
  },
  methods: {
    ...mapActions([
      'toggleInteractions',
    ]),
    tellMe() {
      console.log('tellMe'); // eslint-disable-line no-console
    },
  },
};
</script>

<style scoped>
  .button {margin-left: 2px};
</style>
