<template>
  <div>
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 100%">
      <vl-view
        :ident="viewIdent"
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"/>
      <vl-layer-tile
        id="osm"
        :opacity="1">
        <vl-source-osm/>
      </vl-layer-tile>
      <vl-layer-tile
        id="bing"
        :opacity="0.1">
        <vl-source-bing-maps
          :api-key="apiKey"
          :imagery-set="imagerySet"
        />
      </vl-layer-tile>
    </vl-map>
    <div style="padding: 20px; text-align: left;">
      Zoom: {{ zoom }}<br>
      Center: {{ center }}<br>
      Rotation: {{ rotation }}<br>
    </div>
  </div>
</template>

<script>
import { useVuexForView, BingApiKey } from '../../../global/constants';

export default {
  name: 'MapContainer',
  data() {
    return {
      // eslint-disable-next-line max-len
      apiKey: BingApiKey,
      imagerySet: 'AerialWithLabels',
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
  },
};
</script>
