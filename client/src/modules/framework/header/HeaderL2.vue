<template>
  <div id="buttonsL2">
    <b-tooltip
      label="Select from the dropdown to change whether
        the current display is one map
        with an overlay and opacity slider,
        side by side maps, or one map with a spyglass"
      position="is-top"
      multilined>
      <SelectMapDisplay :map-display="mapDisplay"/>
    </b-tooltip>
    <b-tooltip
      label="Select from the dropdown to change between
        Normal clicking (No lat/lon click),
        and getting lat/lon (in various formats)"
      position="is-top"
      multilined>
      <SelectActionOnClick :action-on-click="actionOnClick"/>
    </b-tooltip>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import './Header.css';
import SelectMapDisplay from './SelectMapDisplay.vue';
import SelectActionOnClick from './SelectActionOnClick.vue';

export default {
  name: 'HeaderR1',
  components: {
    SelectMapDisplay,
    SelectActionOnClick,
  },
  computed: mapState({
    actionOnClick: state => state.mapping.actionOnClick,
    mapDisplay: state => state.mapping.mapDisplay,
  }),
  methods: {
    tellMe() {
      console.log('tellMe');
    },
  },
};
</script>

<style scoped>

</style>
