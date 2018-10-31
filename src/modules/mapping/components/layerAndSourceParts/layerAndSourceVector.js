import _ from 'lodash';

import { attributionFromCode } from '../../utils/mapUtils';
import { befaft, replaceAll } from '../../../../global/utils';

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
    console.log(urlToUse);
    // const urlToUse = 'https://openlayers.org/en/latest/examples/data/geojson/countries.geojson'; // eslint-disable-line max-len
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

export default function layerAndSourceVector(
  createElement,
  layer,
  layerDataObject,
  opsCode,
) {
  let vlSourceElementVector = {};
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
    if (!_.isEmpty(vlSourceElementVector)) {
      vlLayerElementVector = createElement(
        'vl-layer-vector',
        { ...layerDataObject },
        [
          vlSourceElementVector,
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

/*
  if (sdef.url) { // we standardise on there being only one url
    const url = fullOpsURL(sdef.url);
    let srcFormat;
    switch (ext) {
      case 'geojson':
        srcFormat = new OlFormatGeoJSON({ defaultDataProjection: 'EPSG:4326' }); // assumed always 'EPSG:4326'
        break;
      case 'gml-NOT YET':
        srcFormat = new OlFormatGML2({
          defaultDataProjection: 'EPSG:27700',
          srsName: 'EPSG:27700',
        }); // assumed UK OS and GML2 for now
        break;
      default:
        alert(`Vector source extension ${ext} unknown. URL = ${sdef.url}`); // eslint-disable-line no-alert
        break;
    }

    sourceToReturn = new OlSourceVector({
      url,
      format: srcFormat,
      attributions: atts,
    });
    return sourceToReturn;
  }
  return null;
};
*/

/*
          // Countries vector layer
            style: [
              {
                cmp: 'vl-style-box',
                styles: {
                  'vl-style-fill': {
                    color: [255, 255, 255, 0.5],
                  },
                  'vl-style-stroke': {
                    color: '#219e46',
                    width: 2,
                  },
                  'vl-style-text': {
                    text: '\uf041',
                    font: '24px FontAwesome',
                    fill: {
                      color: '#2355af',
                    },
                    stroke: {
                      color: 'white',
                    },
                  },
                },
              },
            ],
          },
*/
