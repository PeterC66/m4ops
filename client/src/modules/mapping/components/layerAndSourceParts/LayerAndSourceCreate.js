import _ from 'lodash';

import layerAndSourceTile from './layerAndSourceTile';
import layerAndSourceWmts from './layerAndSourceWmts';
import layerAndSourceVector from './layerAndSourceVector';
import layerAndSourceGroup from './layerAndSourceGroup';

export default function layerAndSourceCreate(
  createElement,
  layer,
  layerDataObject,
  opsCode,
) {
  const {
    ldid,
    layertype,
  } = layer;
  let vlLayerElement = {};

  if (layertype === 'Tile') {
    vlLayerElement = layerAndSourceTile(
      createElement,
      layer,
      layerDataObject,
    );
  } else if (layertype === 'WMTS') { // the layerDef is defined by its catalogue entry
    // See https://mapping4ops.org/background/useful-background-on-web-mapping/ re WMTS/WMS
    vlLayerElement = layerAndSourceWmts(
      createElement,
      layer,
      layerDataObject,
    );
  } else if (layertype === 'Vector') {
    vlLayerElement = layerAndSourceVector(
      createElement,
      layer,
      layerDataObject,
      opsCode,
    );
  } else if (layertype === 'Group') {
    vlLayerElement = layerAndSourceGroup(
      createElement,
      layer,
      layerDataObject,
      opsCode,
    );
  }

  if (_.isEmpty(vlLayerElement)) {
    console.log(`${ldid} returns no vl elements`);
  }
  return vlLayerElement;
}
