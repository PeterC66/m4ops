<template>
  <div>
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 400px">
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"/>
      <vl-layer-tile id="osm">
        <vl-source-osm/>
      </vl-layer-tile>
    </vl-map>
    <div style="padding: 20px; text-align: left;">
      Zoom: {{ zoom }}<br>
      Center: {{ center }}<br>
      Rotation: {{ rotation }}<br>
      My geolocation: {{ geolocPosition }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMap',
  props: {
    zoomInitial: {
      type: Number,
      required: false,
      default: 2,
    },
    centerInitial: {
      type: Array,
      required: false,
      default: () => [0, 0],
    },
  },
  data() {
    return {
      zoom: this.zoomInitial,
      center: this.centerInitial,
      rotation: 0,
      geolocPosition: undefined,
    };
  },
};
</script>
