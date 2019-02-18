
// import _ from 'lodash';
// import { searchOptionEnum } from '../../../../global/constants';

// ?? We want to stop using this!!!
// function setHTMLofNumber(id, n) {
//   document.getElementById(id).innerHTML = n.toString();
// }

export function processFeatureActions(feature, options) {
  const {
    propertyEquivToShorttext,
    hideUnhide,
    doImages,
    doHtmls,
    setFeatureid,
    layerIndex,
    ldid,
    setOnMflTo,
    setModifiableFeatures,
    textForSearch,
    searchOption,
  } = options;

  // 8) If we want to set modifiableFeatures (for use elsewhere)
  // console.log("pFActions",layer, src, options);

  // We want to do this differently???

  if (setModifiableFeatures) {
  /*
    const modifiableFeatures = src.getFeatures(); // Note this is an array, not a collection
    setHTMLofNumber('NFeatures', modifiableFeatures.length);
    let setEN = (modifiableFeatures.length==1);
    if (setEN) {
      if (modifiableFeatures[0].getGeometry().getType() != 'LineString') setEN = false;
      if (modifiableFeatures[0].getGeometry().getCoordinates().length != 2) setEN = false;
    }
    document.getElementById('btn-EN').style.display = setEN ? 'inline-block':'none';
    // console.log(setEN, modifiableFeatures);
  */
  }

  // Check if we want to do anything else
  if (!(
    propertyEquivToShorttext
    || hideUnhide
    || doImages
    || doHtmls
    || setFeatureid
    || layerIndex
    || ldid
    || setOnMflTo
    || textForSearch
    || searchOption
  )) return false;

  // Do the things
  // If we want to set the features' ldid (so we can use any details of its layer)
  // ldid being truthy implies to set it
  if (ldid) {
    feature.set('ldid', ldid);
  }

  return true;
}

function processFeaturesActions(vmSource, src, options) {
  // console.log('In processFeaturesActions', src, options);
  const {
    propertyEquivToShorttext,
    hideUnhide,
    doImages,
    doHtmls,
    setFeatureid,
    layerIndex,
    ldid,
    setOnMflTo,
    setModifiableFeatures,
    textForSearch,
    searchOption,
  } = options;

  // As src is now defined we do all the actions here, guided by the calling parameters
  // It returns an array value from the textForSearch option (see below)
  //  otherwise it returns whether it succeeds or not

  // 8) If we want to set modifiableFeatures (for use elsewhere)
  // console.log("pFActions",layer, src, options);

  // We want to do this differently???

  if (setModifiableFeatures) {
  /*
    const modifiableFeatures = src.getFeatures(); // Note this is an array, not a collection
    setHTMLofNumber('NFeatures', modifiableFeatures.length);
    let setEN = (modifiableFeatures.length==1);
    if (setEN) {
      if (modifiableFeatures[0].getGeometry().getType() != 'LineString') setEN = false;
      if (modifiableFeatures[0].getGeometry().getCoordinates().length != 2) setEN = false;
    }
    document.getElementById('btn-EN').style.display = setEN ? 'inline-block':'none';
    // console.log(setEN, modifiableFeatures);
  */
  }

  // Check if we want to do anything else
  if (!(
    propertyEquivToShorttext
    || hideUnhide
    || doImages
    || doHtmls
    || setFeatureid
    || layerIndex
    || ldid
    || setOnMflTo
    || textForSearch
    || searchOption
  )) return;

  // Do the things
  src.forEachFeature((feature) => {
    processFeatureActions(feature, options);
  });
  // vmSource.$store.dispatch('setLayerMessage', { ldid });
}

/*
usage eg processFeatures(vectorLayer, {ldid:ldid})
*/

export function processFeatures(vmSource, options) {
  // These are the routines to do things with features (see https://gis.stackexchange.com/questions/215878/how-to-get-the-features-in-a-source-for-a-geojson-vector-layer-and-then-alter-t)
  // We do it all in one place to avoid errors
  // eslint-disable-next-line no-console
  // console.log('In processFeatures', vmSource, options);
  let source = vmSource.$source;
  if (source) {
    const numFeatures = source.getFeatures().length;
    const vmLayer = vmSource.$parent;
    const vectorLayer = vmLayer.$layer;
    // eslint-disable-next-line no-console
    // console.log('pF2', vmLayer, vectorLayer, numFeatures);
    // Known problem that numFeatures may genuinely be zero
    if (numFeatures === 0) {
      vectorLayer.getSource().once('change', (event) => {
        source = event.target;
        if (source.getState() === 'ready') {
          processFeaturesActions(vmSource, source, options);
        } else {
          // eslint-disable-next-line max-len, no-console
          console.log('In getSource change, source not ready', source, source.getState());
        }
      });
    } else if (source.getState() === 'ready') {
      processFeaturesActions(vmSource, source, options);
    } else {
      // eslint-disable-next-line no-console
      console.log('In pF numFeatures>0, but not ready', options, source);
    }
  } else {
  // eslint-disable-next-line max-len, no-console
    console.log('In pF source not found', options, source);
  }
}
