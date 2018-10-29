import Vue from 'vue';
import _ from 'lodash';

import layerAndSourceTile from './layerAndSourceParts/layerAndSourceTile';

export default Vue.component('layer-and-source', {
  props: {
    layer: {
      type: Object,
      required: true,
    },
    layerNumber: {
      type: Number,
      required: true,
    },
  },
  render(createElement) {
    let vlLayerElement = {};
    const { layertype, ldid, title } = this.layer;
    if (layertype === 'Tile') {
      const layerDataObject = {
        props: {
          title,
          id: `${title}-${this.layerNumber}`,
          opacity: this.layer.opacity,
        },
      };

      vlLayerElement = layerAndSourceTile(
        createElement,
        this.layer,
        layerDataObject,
      );
    }

    if (_.isEmpty(vlLayerElement)) {
      console.log(`${ldid} returns no vl elements`);
    }
    return vlLayerElement;
  },
});

