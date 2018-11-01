<template>
  <div>
    <ChooseLayer
      v-for="(layer, index) in chosenLayersMainmap"
      :layer="layer"
      :key="'SCL'+index+layer.ldid"
      :layer-number="index"
      :show-slider="index>0"
    />
    <ChooseLayer
      v-if="nChosenLayers < maxChooseLayers"
      :layer="{ldid:voidLdid, opacity: 0.5}"
      :key="'SCL'+nChosenLayers"
      :layer-number="nChosenLayers"
      :show-slider="false"
    />
  </div>
</template>

<script>
import ChooseLayer from './ChooseLayer.vue';
import { maxChooseLayers } from '../../../global/constants';
import { newVoid } from '../../../global/utils';

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
    };
  },
  computed: {
    nChosenLayers() {
      return this.chosenLayersMainmap.length;
    },
    voidLdid() {
      return newVoid();
    },
  },
};
</script>

<style>

</style>
