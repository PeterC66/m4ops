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

function processFeaturesActions(src, options) {
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
  )) return false;

  let featureCount = 0;
  // Do the things
  src.forEachFeature((feature) => {
    processFeatureActions(feature, options);
    featureCount += 1;
  });

  return featureCount;
}

/*
usage eg processFeatures(vectorLayer, {ldid:ldid})
*/

export function processFeatures(vectorSource, options) {
  // These are the routines to do things with features (see https://gis.stackexchange.com/questions/215878/how-to-get-the-features-in-a-source-for-a-geojson-vector-layer-and-then-alter-t)
  // We do it all in one place to avoid errors
  // eslint-disable-next-line no-console
  console.log('processFeatures', vectorSource, options);
  const source = vectorSource;
  if (source) {
    const numFeatures = source.getFeatures().length;
    // eslint-disable-next-line no-console
    console.log(numFeatures);
    if (source.getState() === 'ready') {
      // const debouncedProcessFeaturesActions =
      // _.debounce(processFeaturesActions, 1000, { trailing: true });
      // source.on('addfeature', e => console.log(e));// debouncedProcessFeaturesActions(source, options));
      // return 'OK';
      return processFeaturesActions(source, options);
    }
    // eslint-disable-next-line max-len, no-console
    console.log('In processFeatures source found, but not ready', options, source);
    return false;
  }
  return undefined;
}
