<template>
  <div>
    <ChooseLayer
      v-for="(ldid, index) in chosenLdidsMainmap"
      :ldid="ldid"
      :key="index"
      :layer-number="index"
    />
    <ChooseLayer
      v-if="nChosenLdids < maxChooseLayers"
      :key="nChosenLdids"
      :layer-number="nChosenLdids"
      :ldid="voidLdid"
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
  //   wantBlankLayerChoice() {
  //     const n = this.nChosenLdids;
  //     const lastChosenLdid = this.chosenLdidsMainmap[n - 1];
  //     return (
  //       n < maxChooseLayers &&
  //       lastChosenLdid &&
  //       lastChosenLdid !== voidLdid);
  //   },
  },
};
</script>

<style>

</style>
