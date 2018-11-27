<template>
  <!-- eslint-disable max-len -->
  <!-- Note that vl-interaction-select has a scoped slot with :features="features"
      so slot-scope="select" here means that the object called "select" here
      has a member "features" which is processed
      as "features" within vl-interaction-select (and available here)-->
  <!-- eslint-enable max-len -->
  <vl-interaction-select
    v-if="drawType == null"
    :features.sync="selectedFeatures"
    :multi="true"
    :condition="pointerMove"
  >

    <template slot-scope="{features}">

      <!-- select styles -->
      <vl-style-box>
        <vl-style-stroke
          :width="7"
          color="#423e9e"/>
        <vl-style-fill :color="[254, 178, 76, 0.7]"/>
        <vl-style-circle :radius="5">
          <vl-style-stroke
            :width="7"
            color="#423e9e"/>
          <vl-style-fill :color="[254, 178, 76, 0.7]"/>
        </vl-style-circle>
      </vl-style-box>
      <vl-style-box :z-index="1">
        <vl-style-stroke
          :width="2"
          color="#d43f45"/>
        <vl-style-circle :radius="5">
          <vl-style-stroke
            :width="2"
            color="#d43f45"/>
        </vl-style-circle>
      </vl-style-box>
      <!--// select styles -->

      <ResultsSidebar
        v-if="areResults"
        :features="features"/>

    </template>
  </vl-interaction-select>
</template>

<script>
import { pointerMove } from 'ol/events/condition';
import _ from 'lodash';

import ResultsSidebar from './ResultsSidebar.vue';

export default {
  name: 'Selection',
  components: {
    ResultsSidebar,
  },
  data() {
    return {
      clickCoordinate: undefined,
      selectedFeatures: [],
      drawType: undefined,
    };
  },
  computed: {
    pointerMove() {
      return pointerMove;
    },
    areResults() {
      return !(_.isEmpty(this.selectedFeatures));
    },
  },
  methods: {
  },
};
</script>
