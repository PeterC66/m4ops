<template>
  <div>
    <vl-overlay
      v-for="feature in select.features"
      :key="feature.id"
      :id="feature.id"
      :position="pointOnSurface(feature.geometry)"
      :auto-pan="false"
      :auto-pan-animation="{ duration: 300 }"
      class="feature-popup">
      <!-- eslint-disable max-len -->
      <!-- Note that vl-overlay has a scoped slot with  :id="id" :position="position" :offset="offset" :positioning="positioning"
      so slot-scope="popup" here means that the object called "popup" here
      has members "id" etc which can be processed here)-->
      <!-- eslint-enable max-len -->
      <template slot-scope="popup">
        <section class="card">
          <header class="card-header">
            <p class="card-header-title">
              Feature ID {{ feature.id }}
            </p>
            <!-- eslint-disable max-len -->
            <!-- @click="selectedFeatures = selectedFeatures.filter(f => f.id !== feature.id)" -->
            <!-- eslint-enable max-len -->
            <a
              class="card-header-icon"
              title="Close">
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
  </div>
</template>

<script>
import { findPointOnSurface } from 'vuelayers/lib/ol-ext';

export default {
  name: 'SelectionPopup',
  props: {
    select: {
      type: Object,
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
