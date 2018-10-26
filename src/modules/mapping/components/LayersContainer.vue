<template>
  <div>
    <layer-and-source
      v-for="(layer, index) in chosenLayerDefsMainmap"
      :layer="layer"
      :key="index"
      :layer-number="index"
    />
  </div>
</template>

<script>
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
};
</script>
