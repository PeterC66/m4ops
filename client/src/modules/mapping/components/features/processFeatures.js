// import { searchOptionEnum } from '../../../../global/constants';

// ?? We want to stop using this!!!
// function setHTMLofNumber(id, n) {
//   document.getElementById(id).innerHTML = n.toString();
// }

function processFeaturesActions(layer, src, options) {
  const {
    propertyEquivToShorttext,
    hideUnhide,
    doImages,
    doHtmls,
    setFeatureid,
    layerIndex,
    setOnMflTo,
    setModifiableFeatures,
    textForSearch,
    searchOption,
  } = options;

  // As src is now defined we do all the actions here, guided by the calling parameters
  // The only return value is from the textForSearch option (see below)
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
    propertyEquivToShorttext ||
    hideUnhide ||
    doImages ||
    doHtmls ||
    setFeatureid ||
    layerIndex ||
    setOnMflTo ||
    textForSearch ||
    searchOption
  )) return false;
  return true;
}

export default function processFeatures(vectorLayer, options) {
  // These are the routines to do things with features (see https://gis.stackexchange.com/questions/215878/how-to-get-the-features-in-a-source-for-a-geojson-vector-layer-and-then-alter-t)
  // We do it all in one place to avoid errors
  // console.log("processFeatures", vectorLayer, options);
  let source = vectorLayer.getSource();
  if (source) {
    const numFeatures = source.getFeatures().length;
    // console.log(numFeatures);
    // Known problem that numFeatures may genuinely be zero
    if (numFeatures === 0) {
      vectorLayer.getSource().once('change', (event) => {
        source = event.target;
        if (source.getState() === 'ready') {
          return processFeaturesActions(vectorLayer, source, options);
        }
        return undefined;
      });
    } else {
      if (source.getState() === 'ready') {
        return processFeaturesActions(vectorLayer, source, options);
      }
      // eslint-disable-next-line max-len, no-console
      console.log('In processFeatures source found, but not ready', vectorLayer, options, source);
    }
  } else {
    // eslint-disable-next-line max-len, no-console
    console.log('In processFeatures no source found', vectorLayer, options);
  }
  return undefined;
}
