<template>
  <div>
    <ChooseLayer
      v-for="(ldid, index) in chosenLdidsMainmap"
      :ldid="ldid"
      :key="index"
      :layer-number="index"
      :starting-opacity="50"
    />
    <ChooseLayer
      v-if="nChosenLdids < maxChooseLayers"
      :key="nChosenLdids"
      :layer-number="nChosenLdids"
      :ldid="voidLdid"
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
    chosenLdidsMainmap: {
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
    nChosenLdids() {
      return this.chosenLdidsMainmap.length;
    },
  },
};
</script>

<style>

</style>
