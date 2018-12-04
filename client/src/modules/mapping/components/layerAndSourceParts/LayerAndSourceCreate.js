import _ from 'lodash';

import layerAndSourceTile from './layerAndSourceTile';
import layerAndSourceWmts from './layerAndSourceWmts';
import layerAndSourceWms from './layerAndSourceWms';
import layerAndSourceVector from './layerAndSourceVector';
import layerAndSourceGroup from './layerAndSourceGroup';

export default function layerAndSourceCreate(
  createElement,
  layerDef,
  layerDataObject,
  opsCode,
) {
  const {
    ldid,
    layertype,
  } = layerDef;
  let vlLayerElement = {};

  if (layertype === 'Tile') {
    vlLayerElement = layerAndSourceTile(
      createElement,
      layerDef,
      layerDataObject,
    );
  } else if (layertype === 'WMTS') { // the layerDef is defined by its catalogue entry
    // See https://mapping4ops.org/background/useful-background-on-web-mapping/ re WMTS/WMS
    vlLayerElement = layerAndSourceWmts(
      createElement,
      layerDef,
      layerDataObject,
    );
  } else if (layertype === 'WMS') {
    vlLayerElement = layerAndSourceWms(
      createElement,
      layerDef,
      layerDataObject,
    );
  } else if (layertype === 'Vector') {
    const layerAndSourceVectorBound = layerAndSourceVector.bind(this);
    vlLayerElement = layerAndSourceVectorBound(
      createElement,
      layerDef,
      layerDataObject,
      opsCode,
    );
  } else if (layertype === 'Group') {
    vlLayerElement = layerAndSourceGroup(
      createElement,
      layerDef,
      layerDataObject,
      opsCode,
    );
  }

  if (_.isEmpty(vlLayerElement)) {
    console.log(`${ldid} returns no vl elements`); // eslint-disable-line no-console
  }
  return vlLayerElement;
}
