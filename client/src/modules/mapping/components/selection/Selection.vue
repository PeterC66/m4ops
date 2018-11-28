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
    :condition="wantHover ? pointerMove : singleClick"
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
import { singleClick, pointerMove } from 'ol/events/condition';
import _ from 'lodash';
import { mapState } from 'vuex';

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
    ...mapState({
      actionOnClick: state => state.mapping.actionOnClick,
    }),
    singleClick() {
      return singleClick;
    },
    pointerMove() {
      return pointerMove;
    },
    wantHover() {
      // return true;
      // eslint-disable-next-line no-console
      console.log(this.actionOnClick, this.actionOnClick !== 'select');
      return this.actionOnClick !== 'select';
    },
    // aocCondition() {
    //   // eslint-disable-next-line max-len, no-console
    //   console.log(this.actionOnClick, singleClick, pointerMove, this.actionOnClick === 'select' ? singleClick : this.pointerMove);
    //   // eslint-disable-next-line max-len
    //   return this.actionOnClick === 'select' ? singleClick : this.pointerMove;
    // },
    areResults() {
      return !(_.isEmpty(this.selectedFeatures));
    },
  },
  methods: {
  },
};
</script>
