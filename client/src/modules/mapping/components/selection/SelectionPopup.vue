<template>
  <div>
    <vl-overlay
      key="overlay"
      :position="pointOnSurface(features[0].geometry)"
      :auto-pan="false"
      :auto-pan-animation="{ duration: 300 }"
      class="feature-popup">
      <!-- eslint-disable max-len -->
      <!-- Note that vl-overlay has a scoped slot with  :id="id" :position="position" :offset="offset" :positioning="positioning"
      so slot-scope="popup" here means that the object called "popup" here
      has members "id" etc which can be processed here)-->
      <!-- eslint-enable max-len -->
      <template slot-scope="popup">
        <p
          v-for="feature in features"
          :key="feature.id"
          :id="feature.id"
        >
          {{ feature.properties.shorttext }}
        </p>
      </template>
    </vl-overlay>
  </div>
</template>

<script>
import { findPointOnSurface } from 'vuelayers/lib/ol-ext';

export default {
  name: 'SelectionPopup',
  props: {
    features: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    pointOnSurface: findPointOnSurface,
  },
};
</script>

<style>
  .feature-popup {
    position: absolute;
    left: -50px;
    bottom: 12px;
    width: 20em;
    max-width: none;
    color: rgb(0,0,0,1.0);
    font-size: small;
    text-shadow:
      -1px -1px 0 rgb(255,255,255,0.2),
      1px -1px 0 rgb(255,255,255,0.2),
      -1px 1px 0 rgb(255,255,255,0.2),
      1px 1px 0 rgb(255,255,255,0.2);
  };
</style>
