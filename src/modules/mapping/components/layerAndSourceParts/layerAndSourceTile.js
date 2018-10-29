import _ from 'lodash';

import { bingApiKey } from '../../constants';

function sourceTile(
  createElement,
  sourcedef,
) {
  const { url, vlsource, imagerySet } = sourcedef;
  let vlSourceElementTile = {};

  if (vlsource === 'osm') {
    vlSourceElementTile = createElement('vl-source-osm');
  } else if (url === 'BingMaps') {
    vlSourceElementTile = createElement(
      'vl-source-bing-maps',
      {
        attrs: {
          'api-key': bingApiKey,
          'imagery-set': imagerySet || 'Aerial',
        },
      },
    );
  }
  return vlSourceElementTile;
}

export default function layerAndSourceTile(
  createElement,
  layer,
  layerDataObject,
) {
  let vlSourceElementTile = {};
  let vlLayerElementTile = {};
  const {
    ldid,
    sourcedef,
  } = layer;
  if (sourcedef) {
    vlSourceElementTile = sourceTile(
      createElement,
      sourcedef,
    );
    if (!_.isEmpty(vlSourceElementTile)) {
      vlLayerElementTile = createElement(
        'vl-layer-tile',
        { ...layerDataObject },
        [
          vlSourceElementTile,
        ],
      );
    } else {
      console.log(`Cannot create vlSourceElementTile for ${ldid}`);
    }
  } else {
    console.log(`${ldid} has undefined sourcedef`);
  }
  return vlLayerElementTile;
}
