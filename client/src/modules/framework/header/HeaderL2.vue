<template>
  <div id="buttonsL2">
    <b-tooltip
      label="Display a map
        with overlay (slider or spyglass),
        or side by side maps"
      position="is-top"
      multilined>
      <SelectMapDisplay :map-display="mapDisplay"/>
    </b-tooltip>
    <b-tooltip
      label="Select what happens when you click"
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
  name: 'HeaderL2',
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
