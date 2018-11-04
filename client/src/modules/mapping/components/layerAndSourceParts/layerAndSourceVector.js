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
    const urlToUse = `http://localhost:5000/featurelayers/${opsCode}_${layerId}`; // eslint-disable-line max-len
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
        console.log(`Vector source extension ${ext} unknown. URL = ${url}`);
    }
  }
  return vlSourceElementVector;
}

function layerStyle(
  createElement,
  sourcedef,
  opsCode,
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
      console.log(`Cannot create vlSourceElementVector for ${ldid}`);
    }
  } else {
    console.log(`${ldid} has undefined sourcedef`);
  }
  return vlLayerElementVector;
}
