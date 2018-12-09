<template>
  <div>
    <layer-and-source
      key="RHL"
      :layer-def="getOPSAllLayerDefsArrayByLdid(chosenRhLayer)"
      :layer-number="0"
      :ops-code="OPSDetails.OPSCode"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import LayerAndSource from './LayerAndSource';

export default {
  name: 'RhLayersContainer',
  components: {
    'layer-and-source': LayerAndSource,
  },
  computed: {
    ...mapGetters([
      'OPSDetails',
      'getOPSAllLayerDefsArrayByLdid',
    ]),
    ...mapState({
      chosenRhLayer: state => state.mapping.chosenRhLayer,
    }),
  },
};
</script>
