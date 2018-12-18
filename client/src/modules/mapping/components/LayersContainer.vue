<template>
  <div>
    <LayerAndSource
      v-for="(layerDef, index) in chosenLayerDefsMainmap"
      :key="'MCL'+index+layerDef.ldid"
      :layer-def="layerDef"
      :layer-number="index"
      :ops-code="OPSDetails.OPSCode"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import LayerAndSource from './LayerAndSource';

export default {
  name: 'LayersContainer',
  components: {
    LayerAndSource,
  },
  props: {
    chosenLayerDefsMainmap: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'OPSDetails',
    ]),
  },
};
</script>
