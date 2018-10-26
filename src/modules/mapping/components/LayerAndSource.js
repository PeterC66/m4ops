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
                'imagery-set': imagerySet,
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

// switch (this.layer.ldid) {
//   case ldidOSM:
//     vlLayerAndSource = createElement(
//       'vl-layer-tile',
//       {
//         attrs: {
//           id: 'osm',
//           opacity: this.layer.opacity,
//         },
//       },
//       [
//         createElement('vl-source-osm'),
//       ],
//     );
//     break;

//   case ldidBingAerial:
//     vlLayerAndSource = createElement(
//       'vl-layer-tile',
//       {
//         attrs: {
//           id: 'bing',
//           opacity: this.layer.opacity,
//         },
//       },
//       [
//         createElement(
//           'vl-source-bing-maps',
//           {
//             attrs: {
//               'api-key': bingApiKey,
//               'imagery-set': 'AerialWithLabelsOnDemand',
//             },

//           },
//         ),
//       ],
//     );
//     break;

//   default:
// }

//   <vl-layer-tile
//   id="osm"
//   :opacity="1"
// >
//   <vl-source-osm/>
// </vl-layer-tile>
// <vl-layer-tile
//   id="bing"
//   :opacity="0.1"
// >
//   <vl-source-bing-maps
//     :api-key="apiKey"
//     :imagery-set="imagerySet"
//   />
// </vl-layer-tile>
