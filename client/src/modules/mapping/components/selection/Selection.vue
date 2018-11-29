<template>
  <!-- eslint-disable max-len -->
  <!-- Note that vl-interaction-select has a scoped slot with :features="features"
      so slot-scope="select" here means that the object called "select" here
      has a member "features" which is processed
      as "features" within vl-interaction-select (and available here)-->
  <!-- eslint-enable max-len -->
  <div>
    <vl-interaction-select
      v-if="drawType == null"
      :features.sync="selectedFeatures"
      :multi="true"
      :condition="desiredCondition"
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
      </template>
    </vl-interaction-select>

    <ResultsSidebar
      v-if="areResults"
      :features="selectedFeatures"/>
  </div>
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
      interactionsOn: state => state.framework.interactionsOn,
    }),
    singleClick() {
      return singleClick;
    },
    pointerMove() {
      return pointerMove;
    },
    wantHover() {
      return this.actionOnClick !== 'select';
    },
    desiredCondition() {
      if (this.interactionsOn) {
        return (this.actionOnClick === 'select') ? singleClick : pointerMove;
      }
      return () => false;
    },
    areResults() {
      return !(_.isEmpty(this.selectedFeatures));
    },
  },
  methods: {
  },
};
</script>
