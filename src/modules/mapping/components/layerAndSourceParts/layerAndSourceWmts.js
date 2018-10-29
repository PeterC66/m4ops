import _ from 'lodash';

import { attributionFromCode } from '../../utils/mapUtils';

function sourceWmts(
  createElement,
  sourcedef,
) {
  const {
    WMTSoptions,
    attribution,
  } = sourcedef;

  let vlSourceElementWmts = {};

  // we standardise on using the attributions array,
  // but we do not cope with there being multiple attributions in the LayerDef yet
  const atts = attribution ? [attributionFromCode(attribution)] : [];

  if (WMTSoptions) {
    vlSourceElementWmts = createElement(
      'vl-source-wmts',
      {
        props: {
          source: WMTSoptions,
          attributions: atts,
        },
      },
    );
  }

  return vlSourceElementWmts;
}

export default function layerAndSourceWmts(
  createElement,
  layer,
  layerDataObject,
) {
  let vlSourceElementWmts = {};
  let vlLayerElementWmts = {};
  const {
    ldid,
    sourcedef,
    folder,
    storageName,
  } = layer;
  if (sourcedef) {
    vlSourceElementWmts = sourceWmts(
      createElement,
      sourcedef,
      folder,
      storageName,
    );
    if (!_.isEmpty(vlSourceElementWmts)) {
      vlLayerElementWmts = createElement(
        'vl-layer-tile',
        { ...layerDataObject },
        [
          vlSourceElementWmts,
        ],
      );
    } else {
      console.log(`Cannot create vlSourceElementWmts for ${ldid}`);
    }
  } else {
    console.log(`${ldid} has undefined sourcedef`);
  }
  return vlLayerElementWmts;
}
