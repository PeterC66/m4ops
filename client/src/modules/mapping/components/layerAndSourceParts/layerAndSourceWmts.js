import _ from 'lodash';

import { attributionFromCode } from '../../utils/mapUtils';

function sourceWmts(
  createElement,
  sourcedef,
) {
  const {
    url,
    attribution,
  } = sourcedef;

  let vlSourceElementWmts = {};

  // we standardise on using the attributions array,
  // but we do not cope with there being multiple attributions in the LayerDef yet
  const atts = attribution ? [attributionFromCode(attribution)] : [];

  if (url) {
    vlSourceElementWmts = createElement(
      'vl-source-wmts',
      {
        props: {
          url,
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
      console.log(`Cannot create vlSourceElementWmts for ${ldid}`); // eslint-disable-line no-console
    }
  } else {
    console.log(`${ldid} has undefined sourcedef`); // eslint-disable-line no-console
  }
  return vlLayerElementWmts;
}


/*
Above does not work!

TODO
(See also vuelayers demo)
From ProcessaLayerDef
      if (layerDefs[ldindex].layertype === 'WMTS') { // we find the options (asynchronously) from the catalog entry
        // From http://openlayers.org/en/latest/examples/wmts-layer-from-capabilities.html
        var parser = new ol.format.WMTSCapabilities();
        if (layerDefs[ldindex].sourcedef){ // this source definition needs transforming into a proper Open Layers source
          var atts = [];
          if (layerDefs[ldindex].sourcedef.attribution){
            atts[0] = attributionFromCode(layerDefs[ldindex].sourcedef.attribution);
          }
          // The then() method returns a Promise (which allows for method chaining). It takes up to two arguments: callback functions for the success and failure cases of the Promise.
          // The Promise object is used for asynchronous computations. A Promise represents a value which may be available now, or in the future, or never.
          fetch(layerDefs[ldindex].sourcedef.url).then(function(response) {
            return response.text();
          }).then(function(text) { // This is done when the fetch has succeeded
            var result = parser.read(text);
            layerDefs[ldindex].sourcedef.WMTSoptions = ol.source.WMTS.optionsFromCapabilities(result,{
              layer: layerDefs[ldindex].sourcedef.layer, // layer comes from the folder field
              format: "image/png"
            });
            //layerDefs[ldindex].sourcedef.WMTSoptions.format = "image/png32"; // to get transparency
            layerDefs[ldindex].sourcedef.WMTSoptions.attributions = atts;
            processaLayerDef(ldindex+1); // do the recursion
          });
        } else {
          alert ('No source for WMTS layer ' + layerDefs[ldindex].sourcedef.layer);
          processaLayerDef(ldindex+1); // do the recursion
        }
*/
