<template>
  <div>
    <vl-map
      id="mainmap"
      ref="mainmap"
      :class="{halved: toHalve}"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      :style="{cursor: mapCursor}"
      data-projection="EPSG:4326"
      @click="clickCoordinate = $event.coordinate"
      @mounted="onMapMounted"
      @pointermove="onMapPointerMove"
    >
      <vl-view
        :ident="viewIdent"
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"
      />
      <Selection />
      <LayersContainer :chosen-layer-defs-mainmap="chosenLayerDefsMainmap" />
    </vl-map>
    <vl-map
      v-if="mapDisplay === 'side-by-side'"
      id="rhmap"
      ref="rhmap"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      :style="{cursor: mapCursor}"
      data-projection="EPSG:4326"
      @click="clickCoordinate = $event.coordinate"
      @mounted="onMapMounted"
      @pointermove="onMapPointerMove"
    >
      <vl-view
        :ident="viewIdent"
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"
      />
      <RhLayersContainer
        :mouse-position="mousePosition"
      />
    </vl-map>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import ScaleLine from 'ol/control/ScaleLine';
import FullScreen from 'ol/control/FullScreen';
import Rotate from 'ol/control/Rotate';
import OverviewMap from 'ol/control/OverviewMap';
import ZoomSlider from 'ol/control/ZoomSlider';

import { useVuexForView } from '../../../global/constants';
import LayersContainer from './LayersContainer.vue';
import Selection from './selection/Selection.vue';
import RhLayersContainer from './RhLayersContainer.vue';

const methods = {
  onMapMounted() {
    this.$refs.mainmap.$map.getControls().extend([
      new ScaleLine(),
      new FullScreen(),
      new Rotate(),
      new OverviewMap({
        collapsed: false,
        collapsible: true,
      }),
      new ZoomSlider(),
    ]);
  },
  onMapPointerMove({ pixel }) {
    const hit = this.$refs.mainmap.forEachFeatureAtPixel(pixel, () => true);
    if (hit) {
      this.mapCursor = 'pointer';
    } else {
      this.mapCursor = 'default';
    }
  },
};

const nudge = (vm) => {
  setTimeout(() => { vm.$refs.mainmap.updateSize(); }, 50);
};

export default {
  name: 'MapContainer',
  components: {
    LayersContainer,
    Selection,
    RhLayersContainer,
  },
  data() {
    return {
      mapCursor: 'default',
      mousePosition: [0, 0],
    };
  },
  computed: {
    viewIdent() {
      return this.$store.state.mapping.view.ident;
    },
    zoom: {
      get() {
        return this.$store.state.mapping.view.zoom;
      },
      set(value) {
        if (useVuexForView) {
          this.$store.dispatch('updateViewZoom', value);
        }
      },
    },
    center: {
      get() {
        return this.$store.state.mapping.view.center;
      },
      set(value) {
        if (useVuexForView) {
          this.$store.dispatch('updateViewCenter', value);
        }
      },
    },
    rotation: {
      get() {
        return this.$store.state.mapping.view.rotation;
      },
      set(value) {
        if (useVuexForView) {
          this.$store.dispatch('updateViewRotation', value);
        }
      },
    },
    ...mapGetters([
      'chosenLayerDefsMainmap',
    ]),
    ...mapState({
      mapDisplay: state => state.mapping.mapDisplay,
    }),
    toHalve() {
      return (this.mapDisplay === 'side-by-side');
    },
  },
  watch: {
    toHalve() {
      nudge(this);
    },
  },
  methods,
};
</script>

<style scoped>
  #mainmap { height:100%; display:inline-block}
  #rhmap { width:50%; height:100%; right:0px; display:inline-block}
  .halved { width:50%; }
</style>
