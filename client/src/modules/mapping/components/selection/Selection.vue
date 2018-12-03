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
        <SelectionPopup
          v-if="areResults"
          :features="selectedFeatures"
        />
      </template>
    </vl-interaction-select>

    <ResultsSidebar
      v-if="areResults"
      :features="selectedFeaturesToShow"
    />
  </div>
</template>

<script>
import { singleClick, pointerMove } from 'ol/events/condition';
import _ from 'lodash';
import { mapState } from 'vuex';

import ResultsSidebar from './ResultsSidebar.vue';
import SelectionPopup from './SelectionPopup.vue';

export default {
  name: 'Selection',
  components: {
    ResultsSidebar,
    SelectionPopup,
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
    selectedFeaturesToShow() {
      return _.uniqBy(this.selectedFeatures.filter(() => true));
    },
    /*
    Can use filter for following from selectAndDisplay(feature, layer) {
  // check the layer property, if it is not set then it means we
  // are over an unmanaged layer and we can ignore this feature - unless it is the MFL
  // onMfl has values False(0) Not on MFL, True(-1) on normal MFL, (also) True(1) on AllFeatures MFL
  const onMfl = getDirectValueOf('onMfl', feature);
  // console.log("feat/Lay",$.extend({}, feature),$.extend({}, layer) ,onMfl);
  if (!layer && !onMfl) {
    return false;
  }
  // check that the layer is a simple Vector Layer (not Vector Tiles, for now, which we can ignore)
  //   and that the opacity is not too low
  if (layer) {
    // if (opacity < 0.2) return; // TODO
    const ld = layerDefs[layer.fromLayerDef];
    if (ld.layertype !== 'Vector') {
      return false;
    }
  }
  Can use uniq for the following
 // This next is for featuresDone - so we can avoid duplicating any features
  const featureid = getDirectValueOf('featureid', feature);
  let prefix = '';
  if (onMfl) {
    prefix = 'MFL_';
  } else {
    const layerIndex = feature.get('layerIndex'); // should be 2-4
    if ([2, 3, 4].indexOf(layerIndex) >= 0) {
      prefix = `${layerIndex.toString()}_`;
    }
  }
  if (featuresDone.indexOf(prefix + featureid) === -1) { // not found, so not already done
AND later
    featuresDone.push(prefix + featureid); // so we do not do duplicates (from SelectedFeaturesLayer)

*/

    areResults() {
      return !(_.isEmpty(this.selectedFeaturesToShow));
    },
  },
  methods: {
  },
};
</script>
