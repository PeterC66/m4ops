<template>
  <b-dropdown
    v-model="value"
    @change="updateActionOnClick"
  >
    <button
      slot="trigger"
      class="button is-primary is-small"
    >
      <span>Action on click</span>
      <b-icon icon="menu-down" />
    </button>

    <b-dropdown-item
      v-for="item in options"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SelectActionOnClick',
  props: {
    actionOnClick: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      options: [{
        value: 'no',
        label: 'Nothing',
      }, {
        value: 'select',
        label: 'Select',
      }, {
        value: 'm4opscsv',
        label: 'M4OPS lon;lat csv',
      }, {
        value: 'm4opsparam',
        label: 'M4OPS parameters',
      }, {
        value: 'csv',
        label: 'lat,lon csv',
      }, {
        value: 'geojson',
        label: 'lon,lat GeoJSON',
      }, {
        value: 'epsg3857',
        label: 'EPSG:3857 (x/y)',
      }, {
        value: 'hdms',
        label: 'DegMinSec N/E',
      }, {
        value: 'geohack',
        label: 'GeoHack links',
      }],
      value: this.actionOnClick,
    };
  },
  methods: {
    ...mapActions([
      'updateActionOnClick',
    ]),
  },
};
</script>

<style scoped>
  .button {margin-right: 2px};
</style>
