import _ from 'lodash';

import { bingApiKey } from '../../constants';

export default function layerAndSourceTile(
  createElement,
  layer,
  layerDataObject,
) {
  let vlSourceElement = {};
  let vlLayerElementTile = {};
  const {
    ldid,
    sourcedef,
  } = layer;
  if (sourcedef) {
    const { url, vlsource, imagerySet } = sourcedef;
    // we know layertype === 'Tile'

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
      vlLayerElementTile = createElement(
        'vl-layer-tile',
        { ...layerDataObject },
        [
          vlSourceElement,
        ],
      );
    }
  } else {
    console.log(`${ldid} has undefined sourcedef`);
  }
  return vlLayerElementTile;
}
