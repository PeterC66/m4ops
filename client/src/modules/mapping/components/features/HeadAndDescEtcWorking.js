/* eslint-disable no-unused-vars, no-undef, max-len */


function PropertyHTML(labl, prop, fieldtype, feature, shownulls) {
  // Like HeadAndDesc returns a string with a property/value pair,  eg that can be appended
  // showing nulls if parameter true
  let s = '';
  propVal = getDirectValueOf(prop, feature);
  if (propVal) {
    switch (fieldtype) {
      case 'color':
        // From https://jsfiddle.net/VRyS2/1/
        s += `<p class="resultsProperty">${labl}: <span class="color-box" style="background-color: ${propVal};"></span></p>`;
        break;
      case 'text':
      case 'textarea':
        s += `<p class="resultsProperty">${labl}: <span class="resultsPropertyValue">${CSV2HTML(propVal)}</span></p>`;
        break;
      default: // 'number','dropdown', 'symbols'
        s += `<p class="resultsProperty">${labl}: <span class="resultsPropertyValue">${propVal}</span></p>`;
    }
  } else if (shownulls) {
    const keys = feature.getKeys();
    if (keys.indexOf(prop) !== -1) { // key exists
      s += `<p class="resultsProperty">${labl}: <span class="resultsPropertyValue">null</span></p>`;
    } else { // key does not exist
      s += `<p class="resultsProperty">${labl}: <span class="resultsPropertyValue">N/A</span></p>`;
    }
  }
  return s;
}

function htmlForXRefResults(feature, layer, evshorttext, evdescription, repeatFeature) {
  let htmlText = '';
  const imagefile = getAValueFor('image', feature, layer);
  if (imagefile && !repeatFeature) {
    htmlText += `<a target="_blank" title="Click for a zoomable version in a new tab" href="JuiceBoxSozi/sozi.php?T=${encodeURIComponent(getAValueFor('shorttext', feature, layer))}&I=${encodeURIComponent(fullOpsURL(`Images/${imagefile}`))}">`;
    htmlText += `<img src="${fullOpsURL(`Images/${imagefile}`)}" style="max-width: 100%;" /></a>`;
  }
  let head = getAValueFor('shorttext', feature, layer);
  if (head) head += `: ${evshorttext}`;
  htmlText += HeadAndDesc(head, evdescription, 'ev', '', '');
  return htmlText;
}

function addToSelectedFeaturesLayer(feature, layer, coordinates) {
  const fid = feature.get('featureid');
  // Only add if not added already
  if (selectedFeaturesIds.indexOf(fid) === -1) {
    // display text on or by the feature, where coordinate is position of mouse
    const text = String(getAValueFor('shorttext', feature, layer));
    if (text) {
      // test the feature's geometry type and compute a reasonable point at which to display the text.
      const geometry = feature.getGeometry();
      let pointForText;
      switch (geometry.getType()) {
        case 'MultiPolygon':
          // eslint-disable-next-line no-case-declarations
          const poly = geometry.getPolygons().reduce((left, right) => (left.getArea() > right.getArea() ? left : right));
          pointForText = poly.getInteriorPoint().getCoordinates();
          break;
        case 'Polygon':
          pointForText = geometry.getInteriorPoint().getCoordinates();
          break;
        default:
          if (coordinates) {
            pointForText = geometry.getClosestPoint(coordinates);
          } else {
            const ext = geometry.getExtent();
            pointForText = ol.extent.getCenter(ext);
          }
      }
      // create a new feature to display the text
      textFeature = new ol.Feature({
        geometry: new ol.geom.Point(pointForText),
      });
      textFeature.set('justText', CSV2HTML(text));
      // and add it to the selectedFeaturesLayer
      selectedFeaturesLayer.getSource().addFeature(textFeature);
    }
    // Also add the feature itself so it gets highlighted
    // as the original feature this has all the same properties, such as layerindex
    selectedFeaturesLayer.getSource().addFeature(feature);
    selectedFeaturesIds.push(fid);
  }
}
