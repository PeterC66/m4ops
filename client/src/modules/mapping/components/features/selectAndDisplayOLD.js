/* eslint-disable */
import { getDirectValueOf } from '../utils/mapUtils';

export const dummy = 1;

export function selectAndDisplay(feature, layer) {
  // check the layer property, if it is not set then it means we
  // are over an unmanaged layer and we can ignore this feature - unless it is the MFL
  // onMfl has values False(0) Not on MFL, True(-1) on normal MFL, (also) True(1) on AllFeatures MFL
  const onMfl = getDirectValueOf('onMfl', feature);
  // console.log("feat/Lay",$.extend({}, feature),$.extend({}, layer) ,onMfl);
  if (!layer && !onMfl) {
    return false;
  }
  // check that the layer is a simple Vector Layer (not Vector Tiles, for now, which we can ignore)
  //   and that the opacity is not too low
  if (layer) {
    // if (opacity < 0.2) return; // TODO
    const ld = layerDefs[layer.fromLayerDef];
    if (ld.layertype !== 'Vector') {
      return false;
    }
  }
  // This next is for featuresDone - so we can avoid duplicating any features
  const featureid = getDirectValueOf('featureid', feature);
  let prefix = '';
  if (onMfl) {
    prefix = 'MFL_';
  } else {
    const layerIndex = feature.get('layerIndex'); // should be 2-4
    if ([2, 3, 4].indexOf(layerIndex) >= 0) {
      prefix = `${layerIndex.toString()}_`;
    }
  }
  if (featuresDone.indexOf(prefix + featureid) === -1) { // not found, so not already done
    // Put html into the display area
    featureinfo.innerHTML += htmlForResults(feature, layer);
    // display text on or by the feature, and highlight the feature
    addToSelectedFeaturesLayer(feature, layer, event.coordinate);
    featuresDone.push(prefix + featureid); // so we do not do duplicates (from SelectedFeaturesLayer)
  }
  return true;
}

const OpenButtonText1 = '<div id="resultsOpenButtonDiv" class="ol-control';
const OpenButtonText2 = `"
  >
    <button
      id="resultsOpenButton"
      title="Open all these results in a new window."
      onclick="openResultsWindow()"
    >
      ðŸ–µ
    </button>
  </div>`;
function htmlForResults(feature, layer) { // layer is undefined for an MFL
  // Create the html for the featureInfo:
  // onMfl has values False(0) Not on MFL, True(-1) on normal MFL, (also) True(1) on AllFeatures MFL
  const onMfl = getDirectValueOf('onMfl', feature); // is False if not a valid property
  let FSid;
  if (layer) FSid = layerDefs[layer.fromLayerDef].FSid; // indicates the fields to show
  // For both MFL and normal put in the button, shorttext, startend dates, description
  let htmlText = OpenButtonText1 + (showlevel === 6300 ? ' highlight' : '') + OpenButtonText2;
  htmlText += HeadAndDesc(`${getAValueFor('shorttext', feature, layer)} ${startend(feature, layer)}`, getAValueFor('description', feature, layer), '', '', '');
  // For normal (and potentially MFL) put in the image
  const imagefile = getAValueFor('image', feature, layer);
  if (imagefile) {
    htmlText += `<a target="_blank" title="Click for a zoomable version in a new tab" href="JuiceBoxSozi/sozi.php?T=${encodeURIComponent(getAValueFor('shorttext', feature, layer))}&I=${encodeURIComponent(fullOpsURL(`Images/${imagefile}`))}">`;
    htmlText += `<img src="${fullOpsURL(`Images/${imagefile}`)}" style="max-width: 100%;" /></a>`;
  }
  // For normal (and potentially MFL) put in the htmlfile
  const htmlfile = getAValueFor('html', feature, layer);
  if (htmlfile) {
    const htmlPageText = htmlFromFile(htmlfile);
    if (htmlPageText) {
      const htmlOfBody = withinTags(htmlPageText, 'body');
      htmlText += tailorImgs(withinTags(htmlOfBody, 'font'));
    }
  }
  // For normal (and potentially MFL) put in the event shorttext, description within startend dates
  let startDate;
  let endDate;
  if (showlevel >= 5500 && layer) {
    const ld = layerDefs[layer.fromLayerDef];
    if (ld.FeaturesExtras) {
      // FeaturesExtras has a "FeaturesArray": each Feature has "featureid" and possibly an "EventsArray"
      const fa = ld.FeaturesExtras.FeaturesArray;
      const faindex = indexOfArrayM4(fa, feature.get('featureid'), 'featureid');
      if (faindex >= 0) {
        const ea = fa[faindex].EventsArray;
        if (ea) {
          for (var i = 0; i < ea.length; i++) {
            startDate = new Date(getAValueFor(
              'evdatestart',
              ea[i],
              layer,
            ).toString() ); // getAValueFor has default values hard-coded
            endDate = new Date(getAValueFor('evdateend', ea[i], layer).toString());
            if (!((startDate > upperDate) || (endDate < lowerDate))) {
              htmlText += HeadAndDesc(getAValueFor('evshorttext', ea[i], layer), getAValueFor('evdescription', ea[i], layer), 'ev', '', '');
            }
          }
        } else {
          htmlText += '(No further information)';
        }
      }
    }
  }

  let FSindex = notOK; // -999
  // onMfl has values False(0) Not on MFL, True(-1) on normal MFL, (also) True(1) on AllFeatures MFL
  if (onMfl) {
    FSindex = checkFSOK(); // -1 means AllProperties
  } else if (FSid) { // ie the Layer has a FieldSpec defined
    FSindex = checkFSOK(FSid);
  }

  if (FSindex != notOK) {
    const fieldSpec = fieldSpecWanted(FSindex, feature);
    let fields = fieldsWanted(fieldSpec);
    if (!fields) {
      fields = allProperties(feature);
      consolelog('As no fieldsWanted, fields is set to allProperties');
    }
    // console.log("fields",$.extend({}, fields));

    for (var i = 0; i < fields.length; i++) {
      // Don't show those we have hard-coded to show, but show the others
      // (used to include "datestart", "dateend")
      if (['shorttext', 'description'].indexOf(fields[i].fieldname) < 0) {
        // PropertyHTML returns a string with a label/value pair, showing nulls if parameter true
        htmlText += PropertyHTML(fields[i].label, fields[i].fieldname, fields[i].fieldtype, feature, true);
      }
    }
  }
  htmlForResultsToShow += htmlText; // Global Used by OpenHTML to display results
  return htmlText;
}
