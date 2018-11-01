<template>
  <div>
    <layer-and-source
      v-for="(layer, index) in chosenLayerDefsMainmap"
      :layer="layer"
      :key="'MCL'+index+layer.ldid"
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
