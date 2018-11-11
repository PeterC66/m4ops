import _ from 'lodash';

import { getLayerTitles } from '../../utils/layerFromDefUtils';
import layerAndSourceCreate from './LayerAndSourceCreate';
import store from '../../../../store';

/* TODO ??
    if (ld.sourcedef) {
      // this source definition needs transforming into a proper Open Layers source
      layerToReturn.setLayers(layerCollectionFromDef(ld.sourcedef));
      // ld.sourcedef is a string array of layers
    }

    if (ld.extent) {
      layerToReturn.setExtent(OlProj.transformExtent(ld.extent, 'EPSG:4326', 'EPSG:3857'));
    } else if (ld.minx) { // minx, miny, maxx, maxy must all be there or all absent
      const extent = [ld.minx, ld.miny, ld.maxx, ld.maxy];
      layerToReturn.setExtent(OlProj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857'));
    } else if (ld.sourcedef) {
      const extent = groupExtentFromDef(ld.sourcedef); // eslint-disable-line no-use-before-define
      // assuming ld.sourcedef is a string array of layers
      if (extent) layerToReturn.setExtent(extent);
    }
    layerToReturn.candownload = string2bool(ld.candownload, false);
    layerToReturn.fromLayerDef = ldindex; // used to get back from Layer to LayerDef
    layerToReturn.ldid = ldid; // used to get back from Layer to LayerDef

    return layerToReturn;
    */

/*
<vl-layer-group id="layer-group" :opacity="opacity" :visible="visible">
  <vl-layer-tile id="wms">
    <vl-source-wms url="https://ahocevar.com/geoserver/wms" layers="topp:states" :ext-params="{ TILED: true }" server-type="geoserver"/>
  </vl-layer-tile>
</vl-layer-group>
*/

function LayersInGroup(
  createElement,
  sourcedef,
) {
  const vlLayersInGroup = [];
  const { url } = sourcedef;
  if (url) {
    const layerTitles = getLayerTitles(url);
    layerTitles.forEach((layerTitle) => {
      const layer = store.getters.getOPSAllLayerDefsArrayByTitle(layerTitle);
      let vlLayerElement = {};
      if (layer) {
        vlLayerElement = layerAndSourceCreate(
          createElement,
          layer,
          {},
        );
      } else {
        console.log(`Cannot find Layer ${layerTitle}`); // eslint-disable-line no-console
      }

      if (_.isEmpty(vlLayerElement)) {
        console.log(`${layerTitle} returns no vl elements`);
      } else {
        vlLayersInGroup.push(vlLayerElement);
      }
    });
  }
  return vlLayersInGroup;
}

export default function layerAndSourceGroup(
  createElement,
  layer,
  layerDataObject,
) {
  let vlLayerElementGroup = {};
  let vlLayersInGroup = [];
  const {
    ldid,
    sourcedef,
  } = layer;
  if (sourcedef) {
    vlLayersInGroup = LayersInGroup(
      createElement,
      sourcedef,
    );
    if (!_.isEmpty(vlLayersInGroup)) {
      vlLayerElementGroup = createElement(
        'vl-layer-group',
        { ...layerDataObject },
        vlLayersInGroup,
      );
    } else {
      console.log(`Cannot create vlLayersInGroup for ${ldid}`);
    }
  } else {
    console.log(`${ldid} has undefined sourcedef`);
  }
  return vlLayerElementGroup;
}
