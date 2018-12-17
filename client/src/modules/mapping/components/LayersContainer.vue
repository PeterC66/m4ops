<template>
  <div>
    <layer-and-source
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
    'layer-and-source': LayerAndSource,
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
