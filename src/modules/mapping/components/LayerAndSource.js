import Vue from 'vue';
import _ from 'lodash';

import layerAndSourceTile from './layerAndSourceParts/layerAndSourceTile';
import layerAndSourceWmts from './layerAndSourceParts/layerAndSourceWmts';

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
    const layerDataObject = {
      props: {
        title,
        id: `${title}-${this.layerNumber}`,
        opacity: this.layer.opacity,
      },
    };
    if (layertype === 'Tile') {
      vlLayerElement = layerAndSourceTile(
        createElement,
        this.layer,
        layerDataObject,
      );
    } else if (layertype === 'WMTS') { // the layerDef is defined by its catalogue entry
      // See https://mapping4ops.org/background/useful-background-on-web-mapping/ re WMTS/WMS
      vlLayerElement = layerAndSourceWmts(
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

