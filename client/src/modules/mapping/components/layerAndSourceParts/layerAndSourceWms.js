import _ from 'lodash';

// import { attributionFromCode } from '../../utils/mapUtils';

function sourceWms(
  createElement,
  sourcedef,
) {
  const {
    url,
    // attribution,
    // layer,
    // projection = 'EPSG:3857',
  } = sourcedef;

  let vlSourceElementWms = {};

  // const atts = attribution ? [attributionFromCode(attribution)] : [];

  if (url) {
    vlSourceElementWms = createElement(
      'vl-source-wms',
      {
        props: {
          url: 'https://ahocevar.com/geoserver/wms',
          layers: 'topp:states',
          // url,
          // attributions: atts,
          // projection,
          // layers: layer, // layer originally comes from the folder field in .csv
          extParams: { TILED: true },
          serverType: 'geoserver',
        },
      },
    );
  }

  return vlSourceElementWms;
}

/*
Example:
  source: {
    url: 'https://ahocevar.com/geoserver/wms',
    layers: 'topp:states',
    extParams: { TILED: true },
    serverType: 'geoserver',
  },
},

*/

/* TODO??
    if (ld.source) { // this is a proper Open Layers source already (eg the Universal Layers)
      layerToReturn.setSource(ld.source);

      /* Need projection?
    if (ld.extent) {
      layerToReturn.setExtent(OlProj.transformExtent(ld.extent,'EPSG:4326', 'EPSG:3857'));
    } else if (ld.minx) { //minx, miny, maxx, maxy must all be there or all absent
      const extent = [ld.minx, ld.miny, ld.maxx, ld.maxy];
      layerToReturn.setExtent(OlProj.transformExtent(extent,'EPSG:4326', 'EPSG:3857'));
    } * /
    layerToReturn.candownload = string2bool(ld.candownload, false);
    layerToReturn.fromLayerDef = ldindex; // used to get back from Layer to LayerDef
    layerToReturn.ldid = ldid; // used to get back from Layer to LayerDef
    // console.log(layerToReturn);
    return layerToReturn;
  }
  return null;
}

*/

export default function layerAndSourceWms(
  createElement,
  layer,
  layerDataObject,
) {
  let vlSourceElementWms = {};
  let vlLayerElementWms = {};
  const {
    ldid,
    sourcedef,
  } = layer;
  if (sourcedef) {
    vlSourceElementWms = sourceWms(
      createElement,
      sourcedef,
    );
    if (!_.isEmpty(vlSourceElementWms)) {
      vlLayerElementWms = createElement(
        'vl-layer-tile',
        { ...layerDataObject },
        [
          vlSourceElementWms,
        ],
      );
    } else {
      console.log(`Cannot create vlSourceElementWms for ${ldid}`);
    }
  } else {
    console.log(`${ldid} has undefined sourcedef`);
  }
  return vlLayerElementWms;
}
