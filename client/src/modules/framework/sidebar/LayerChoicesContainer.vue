<template>
  <div>
    <ChooseLayer
      v-for="(layer, index) in chosenLayersMainmap"
      :key="'SCL'+index+layer.ldid"
      :layer="layer"
      :layer-number="index"
      :show-slider="index>0"
      :show-up-button="index>0"
    />
    <ChooseLayer
      v-if="nChosenLayers < maxChooseLayers"
      :key="'SCL'+nChosenLayers"
      :layer="{ldid:voidLdid, opacity: 0.5}"
      :layer-number="nChosenLayers"
      :show-slider="false"
      :show-up-button="false"
    />
    <div
      v-if="mapDisplay === 'side-by-side'"
    >
      <p class="rhmap">
        RH Map
      </p>
      <ChooseLayer
        key="SCLRH"
        :layer="{ldid:chosenRhLayer}"
        :layer-number="-1"
        :show-slider="false"
        :show-up-button="false"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChooseLayer from './ChooseLayer.vue';
import { maxChooseLayers } from '../../../global/constants';
import { newVoid } from '../../../global/utils';

export default {
  name: 'LayerChoicesContainer',
  components: {
    ChooseLayer,
  },
  props: {
    chosenLayersMainmap: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      maxChooseLayers,
    };
  },
  computed: {
    nChosenLayers() {
      return this.chosenLayersMainmap.length;
    },
    voidLdid() {
      return newVoid();
    },
    ...mapState({
      mapDisplay: state => state.mapping.mapDisplay,
      chosenRhLayer: state => state.mapping.chosenRhLayer,
    }),
  },
};
</script>

<style>
  .rhmap {text-align: center;}
</style>
