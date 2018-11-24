<template>
  <vl-interaction-select
    v-if="drawType == null"
    :features.sync="selectedFeatures"
    :condition="pointerMove">
    <template slot-scope="select">
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

      <!-- selected feature popup -->
      <vl-overlay
        v-for="feature in select.features"
        :key="feature.id"
        :id="feature.id"
        :position="pointOnSurface(feature.geometry)"
        :auto-pan="true"
        :auto-pan-animation="{ duration: 300 }"
        class="feature-popup">
        <template slot-scope="popup">
          <section class="card">
            <header class="card-header">
              <p class="card-header-title">
                Feature ID {{ feature.id }}
              </p>
              <!-- eslint-disable max-len -->
              <a
                class="card-header-icon"
                title="Close"
                @click="selectedFeatures = selectedFeatures.filter(f => f.id !== feature.id)">
                <!-- eslint-enable max-len -->
                <b-icon icon="close"/>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                <!-- eslint-disable max-len -->
                <p>
                  Overlay popup content for Feature with ID <strong>{{ feature.id }}</strong>
                </p>
                <!-- eslint-enable max-len -->
                <p>
                  Popup: {{ JSON.stringify(popup) }}
                </p>
                <!-- eslint-disable max-len -->
                <p>
                  Feature: {{ JSON.stringify({ id: feature.id, properties: feature.properties }) }}
                </p>
                <!-- eslint-enable max-len -->
              </div>
            </div>
          </section>
        </template>
      </vl-overlay>
      <!--// selected popup -->
    </template>
  </vl-interaction-select>
</template>

<script>
import { findPointOnSurface } from 'vuelayers/lib/ol-ext';
import { pointerMove } from 'ol/events/condition';

export default {
  name: 'Selection',
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
  },
  methods: {
    pointOnSurface: findPointOnSurface,
  },
};
</script>
