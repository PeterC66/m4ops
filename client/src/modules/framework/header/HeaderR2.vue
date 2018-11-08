<template>
  <div
    id="buttonsR2"
    class="level">
    <div class="level-right">
      <b-tooltip
        label="Text to be searched for within open features,
        or coordinates to go to (any format).  If blank will ask."
        position="is-top"
        multilined>
        <b-field>
          <b-input
            v-model="formInline.textForSearchOrCoords"
            size="is-small"
            placeholder="Text or Coords to GoTo"/>
        </b-field>
      </b-tooltip>
      <b-tooltip
        label="GoTo as specified"
        position="is-left"
        multilined>
        <button
          class="button is-primary is-small"
          @click="tellMe()">
          <span class="icon">
            <font-awesome-icon :icon="['fas','search']"/>
          </span>
        </button>
      </b-tooltip>
      <b-tooltip
        label="Make the current view of M4OPS available as a URL to copy"
        position="is-left"
        multilined>
        <button
          class="button is-primary is-small"
          @click="tellMe()">
          <span class="icon">
            <font-awesome-icon :icon="['far','clone']"/>
          </span>
        </button>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
import './Header.css';

export default {
  name: 'HeaderR2',
  data() {
    return {
      formInline: {
        textForSearchOrCoords: '',
      },
    };
  },
  methods: {
    tellMe() {
      console.log('tellMe');
    },
  },
};
</script>

<style scoped>
  .button {margin-left: 2px};
</style>
