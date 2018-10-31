import Vue from 'vue';
import _ from 'lodash';

import layerAndSourceTile from './layerAndSourceParts/layerAndSourceTile';
import layerAndSourceWmts from './layerAndSourceParts/layerAndSourceWmts';
import layerAndSourceVector from './layerAndSourceParts/layerAndSourceVector';

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
    opsCode: {
      type: String,
      required: true,
    },
  },
  computed: {
    ldidN() { // Just to get redisplayed
      return this.layer.ldid + this.layerNumber;
    },
  },
  render(createElement) {
    let vlLayerElement = {};
    const {
      layertype,
      ldid,
      title,
      layerdescription,
    } = this.layer;
    const layerDataObject = {
      props: {
        title,
        layerdescription,
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
    } else if (layertype === 'Vector') {
      vlLayerElement = layerAndSourceVector(
        createElement,
        this.layer,
        layerDataObject,
        this.opsCode,
      );
    }

    if (_.isEmpty(vlLayerElement)) {
      console.log(`${ldid} returns no vl elements`);
    }
    return vlLayerElement;
  },
});

