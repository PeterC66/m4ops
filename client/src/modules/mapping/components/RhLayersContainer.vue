<template>
  <div>
    <LayerAndSource
      key="RHL"
      :layer-def="getOPSAllLayerDefsArrayByLdid(chosenRhLayer)"
      :layer-number="0"
      :ops-code="OPSDetails.OPSCode"
    />
    <MousePointer
      :position="mousePosition"
      :rh="true"
    />
  </div>
</template>

<!-- eslint-disable max-len -->

<!--

  mouseCrossVectorLayer = new ol.layer.Vector({
    source: mouseCrossVectorSource,
    title: 'MouseCross'
  });

  var RHmouseCrossVectorLayer = new ol.layer.Vector({
    source: mouseCrossVectorSource,
    title: 'MouseCross'
  });

  RHmouseCrossVectorLayer.setMap(RHmap); // main map has it attached by the side-by-side button process

   map.on('pointermove', function(event) {
    mouseCrossFeature.setGeometry(null);
    var coord3857 = event.coordinate;
    mouseCrossFeature.setGeometry( new ol.geom.Point(coord3857) );
    mouseCrossVectorLayer.setVisible(false);
    RHmouseCrossVectorLayer.setVisible(true);
  });

   RHmap.on('pointermove', function(event) {
    mouseCrossFeature.setGeometry(null);
    var coord3857 = event.coordinate;
    mouseCrossFeature.setGeometry( new ol.geom.Point(coord3857) );
    mouseCrossVectorLayer.setVisible(true);
    RHmouseCrossVectorLayer.setVisible(false);
  });

-->

<script>
import { mapGetters, mapState } from 'vuex';

import LayerAndSource from './LayerAndSource';
import MousePointer from './MousePointer.vue';

export default {
  name: 'RhLayersContainer',
  components: {
    LayerAndSource,
    MousePointer,
  },
  props: {
    mousePosition: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'OPSDetails',
      'getOPSAllLayerDefsArrayByLdid',
    ]),
    ...mapState({
      chosenRhLayer: state => state.mapping.chosenRhLayer,
    }),
  },
};
</script>
