<template>
  <div id="buttonsL2">
    <b-tooltip
      label="Map with overlays (slider or spyglass),
        or side by side maps?"
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
    <b-tooltip
      label="Open or close the sidebar"
      position="is-right"
      multilined>
      <div class="field">
        <b-switch
          v-model="switchValue"
          size="is-small"
          @input="switchSidebar"/>
      </div>
    </b-tooltip>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import SelectMapDisplay from './SelectMapDisplay.vue';
import SelectActionOnClick from './SelectActionOnClick.vue';

export default {
  name: 'HeaderL2',
  components: {
    SelectMapDisplay,
    SelectActionOnClick,
  },
  data() {
    return {
      switchValue: true,
    };
  },
  computed: mapState({
    actionOnClick: state => state.mapping.actionOnClick,
    mapDisplay: state => state.mapping.mapDisplay,
  }),
  methods: {
    tellMe() {
      console.log('tellMe');
    },
    ...mapActions([
      'switchSidebar',
    ]),
  },
};
</script>

<style scoped>
</style>
