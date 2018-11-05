import Vue from 'vue';
import _ from 'lodash';

import layerAndSourceCreate from './layerAndSourceParts/LayerAndSourceCreate';

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
  render(createElement) {
    let vlLayerElement = {};
    const {
      ldid,
      title,
      layerdescription,
      opacity,
    } = this.layer;
    const visible = true;
    const layerDataObject = {
      attrs: {
        title,
        layerdescription,
        id: `${title}-${this.layerNumber}`,
        opacity,
        visible,
        layer: this.layer,
        'z-index': this.layerNumber,
      },
      key: `ML${this.layerNumber}${ldid}`,
    };
    // console.log(`rendering ML ${this.layerNumber} ${opacity} ${ldid}`);
    vlLayerElement = layerAndSourceCreate(
      createElement,
      this.layer,
      layerDataObject,
      this.opsCode,
    );

    if (_.isEmpty(vlLayerElement)) {
      console.log(`${ldid} returns no vl elements`);
    }
    return vlLayerElement;
  },
});

