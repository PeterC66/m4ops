import Vue from 'vue';
import _ from 'lodash';

import { bingApiKey } from '../constants';

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
    let vlSourceElement = {};
    let vlLayerElement = {};
    const {
      layertype,
      ldid,
      sourcedef,
      title,
    } = this.layer;
    if (sourcedef) {
      const { url, vlsource, imagerySet } = sourcedef;
      if (layertype === 'Tile') {
        if (vlsource === 'osm') {
          vlSourceElement = createElement('vl-source-osm');
        } else if (url === 'BingMaps') {
          vlSourceElement = createElement(
            'vl-source-bing-maps',
            {
              attrs: {
                'api-key': bingApiKey,
                'imagery-set': imagerySet || 'Aerial',
              },
            },
          );
        }
        if (!_.isEmpty(vlSourceElement)) {
          vlLayerElement = createElement(
            'vl-layer-tile',
            {
              attrs: {
                id: `${title}-${this.layerNumber}`,
                opacity: this.layer.opacity,
              },
            },
            [
              vlSourceElement,
            ],
          );
        }
      }
    } else {
      console.log(`${ldid} has undefined sourcedef`);
    }

    if (_.isEmpty(vlLayerElement)) {
      console.log(`${ldid} returns no vl elements`);
    }
    return vlLayerElement;
  },
});
