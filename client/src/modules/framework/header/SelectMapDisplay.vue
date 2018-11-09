<template>
  <b-dropdown
    v-model="value"
    @change="updateMapDisplay"
  >
    <button
      slot="trigger"
      class="button is-primary  is-small">
      <span>Map display</span>
      <b-icon icon="menu-down"/>
    </button>

    <b-dropdown-item
      v-for="item in options"
      :key="item.value"
      :value="item.value"
    >{{ item.label }}</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SelectMapDisplay',
  props: {
    mapDisplay: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options: [{
        value: 'overlay',
        label: 'Overlay',
      }, {
        value: 'spyglass',
        label: 'Spyglass',
      }, {
        value: 'side-by-side',
        label: 'Side by Side',
      }],
      value: this.mapDisplay,
    };
  },
  methods: {
    ...mapActions([
      'updateMapDisplay',
    ]),
  },
};
</script>

<style scoped>
  .button {margin-right: 2px};
</style>
