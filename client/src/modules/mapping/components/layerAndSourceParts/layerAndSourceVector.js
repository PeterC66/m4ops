import _ from 'lodash';

import { attributionFromCode } from '../../utils/mapUtils';
import { befaft, replaceAll } from '../../../../global/utils';
import { createVlStyleBox } from '../other/styleComponents';

function sourceVector(
  createElement,
  sourcedef,
  opsCode,
) {
  const {
    url,
    attribution,
  } = sourcedef;

  let vlSourceElementVector = {};

  if (url) {
    const ext = befaft(url, '.')[1].toLowerCase(); // assumes only one period
    const layerId = replaceAll(befaft(url, '.')[0], ' ', '_'); // assumes only one period
    const urlToUse = `${process.env.VUE_APP_BACKEND_URL}featurelayers/${opsCode}_${layerId}`; // eslint-disable-line max-len
    const atts = attribution ? [attributionFromCode(attribution)] : [];
    switch (ext) {
      case 'geojson':
        vlSourceElementVector = createElement(
          'vl-source-vector',
          {
            props: {
              url: urlToUse,
              attributions: atts,
            },
          },
        );
        break;
      default:
        console.log(`Vector source extension ${ext} unknown. URL = ${url}`); // eslint-disable-line no-console
    }
  }
  return vlSourceElementVector;
}

// eslint-disable-next-line function-paren-newline
function layerStyle(
  createElement,
  // sourcedef,
  // opsCode,
// eslint-disable-next-line function-paren-newline
) {
  const vlLayerStyle = createVlStyleBox(createElement, {
    strokeColor: 'DarkGreen',
    fillColor: 'LightGreen',
    radius: 5,
    circleColor: 'orange',
  });

  return vlLayerStyle;
}

export default function layerAndSourceVector(
  createElement,
  layer,
  layerDataObject,
  opsCode,
) {
  let vlSourceElementVector = {};
  let vlLayerStyle = {};
  let vlLayerElementVector = {};
  const {
    ldid,
    sourcedef,
  } = layer;
  if (sourcedef) {
    vlSourceElementVector = sourceVector(
      createElement,
      sourcedef,
      opsCode,
    );
    vlLayerStyle = layerStyle(
      createElement,
      sourcedef,
      opsCode,
    );
    if (!_.isEmpty(vlSourceElementVector)) {
      vlLayerElementVector = createElement(
        'vl-layer-vector',
        { ...layerDataObject },
        [
          vlSourceElementVector,
          vlLayerStyle,
        ],
      );
    } else {
      console.log(`Cannot create vlSourceElementVector for ${ldid}`); // eslint-disable-line no-console
    }
  } else {
    console.log(`${ldid} has undefined sourcedef`); // eslint-disable-line no-console
  }
  return vlLayerElementVector;
}
