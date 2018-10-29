<template>
  <div>
    <ChooseLayer
      v-for="(layer, index) in chosenLayersMainmap"
      :layer="layer"
      :key="index"
      :layer-number="index"
      :show-slider="index>0"
    />
    <ChooseLayer
      v-if="nChosenLayers < maxChooseLayers"
      :layer="{ldid:voidLdid, opacity: 0.5}"
      :key="nChosenLayers"
      :layer-number="nChosenLayers"
      :show-slider="false"
    />
  </div>
</template>

<script>
import ChooseLayer from './ChooseLayer.vue';
import { maxChooseLayers, voidLdid } from '../../../global/constants';

export default {
  name: 'LayersContainer',
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
      voidLdid,
    };
  },
  computed: {
    nChosenLayers() {
      return this.chosenLayersMainmap.length;
    },
  },
};
</script>

<style>

</style>
