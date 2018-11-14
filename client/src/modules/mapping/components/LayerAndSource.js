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
        layer: this.layer,
        layerdescription,
        title,
      },
      props: {
        id: `${title}-${this.layerNumber}`,
        visible,
        opacity,
        'z-index': this.layerNumber,
      },
      key: `ML${this.layerNumber}${ldid}`,
    };
    // eslint-disable-next-line max-len
    // console.log(`rendering ML ${this.layerNumber} ${opacity} ${ldid}`, { ...layerDataObject.attrs }, { ...layerDataObject.props });
    vlLayerElement = layerAndSourceCreate(
      createElement,
      this.layer,
      layerDataObject,
      this.opsCode,
    );

    // eslint-disable-next-line max-len
    // console.log(vlLayerElement.key, { ...layerDataObject.attrs }, { ...layerDataObject.props }, vlLayerElement);
    if (_.isEmpty(vlLayerElement)) {
      console.log(`${ldid} returns no vl elements`); // eslint-disable-line no-console
    }
    return vlLayerElement;
  },
});

