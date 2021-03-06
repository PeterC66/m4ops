/* eslint-disable */

function htmlForResults(feature) { // layer is undefined for an MFL
  // Create the html for the featureInfo:
  // onMfl has values False(0) Not on MFL, True(-1) on normal MFL, (also) True(1) on AllFeatures MFL
  const onMfl = getDirectValueOf('onMfl', feature); // is False if not a valid property
  let FSid;
  if (layer) FSid = layerDefs[layer.fromLayerDef].FSid; // indicates the fields to show

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
            endDate = new Date(getAValueFor('evdateend', ea[i]).toString());
            if (!((startDate > upperDate) || (endDate < lowerDate))) {
              htmlText += HeadAndDesc(getAValueFor('evshorttext', ea[i]), getAValueFor('evdescription', ea[i]), 'ev', '', '');
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
