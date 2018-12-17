
function PropertyHTML(labl, prop, fieldtype, feature, shownulls) {
  // Like HeadAndDesc returns a string with a property/value pair,  eg that can be appended
  // showing nulls if parameter true
  var s = "";
  propVal = getDirectValueOf(prop, feature);
  if (propVal) {
    switch (fieldtype) {
      case 'color':
        // From https://jsfiddle.net/VRyS2/1/
        s += '<p class="resultsProperty">' + labl + ': <span class="color-box" style="background-color: ' + propVal + ';"></span></p>';
        break;
      case 'text':
      case 'textarea':
        s += '<p class="resultsProperty">' + labl + ': <span class="resultsPropertyValue">' + CSV2HTML(propVal) + '</span></p>';
        break;
      default: // 'number','dropdown', 'symbols'
        s += '<p class="resultsProperty">' + labl + ': <span class="resultsPropertyValue">' + propVal + '</span></p>';
    }
  } else {
    if (shownulls) {
      var keys = feature.getKeys();
      if (keys.indexOf(prop) !== -1) { // key exists
        s += '<p class="resultsProperty">' + labl + ': <span class="resultsPropertyValue">null</span></p>';
      } else { // key does not exist
        s += '<p class="resultsProperty">' + labl + ': <span class="resultsPropertyValue">N/A</span></p>';
      }
    }
  }
  return s;
}

function htmlForXRefResults(feature, layer, evshorttext, evdescription, repeat_feature) {
  var htmlText = "";
  var imagefile = getAValueFor('image', feature, layer);
  if (imagefile && !repeat_feature) {
    htmlText += '<a target="_blank" title="Click for a zoomable version in a new tab" href="JuiceBoxSozi/sozi.php?T=' + encodeURIComponent(getAValueFor('shorttext', feature, layer)) + '&I=' + encodeURIComponent(fullOpsURL('Images/' + imagefile)) + '">';
    htmlText += '<img src="' + fullOpsURL('Images/' + imagefile) + '" style="max-width: 100%;" /></a>';
  }
  var head = getAValueFor('shorttext', feature, layer);
  if (head) head += ': ' + evshorttext;
  htmlText += HeadAndDesc(head, evdescription, "ev", "", "");
  return htmlText;
}

function addToSelectedFeaturesLayer(feature, layer, coordinates) {
  var fid = feature.get("featureid");
  // Only add if not added already
  if (selectedFeaturesIds.indexOf(fid) === -1) {
    // display text on or by the feature, where coordinate is position of mouse
    var text = String(getAValueFor('shorttext', feature, layer));
    if (text){
      // test the feature's geometry type and compute a reasonable point at which to display the text.
      var geometry = feature.getGeometry();
      var pointForText;
      switch (geometry.getType()) {
        case 'MultiPolygon':
          var poly = geometry.getPolygons().reduce(function(left, right) {
            return left.getArea() > right.getArea() ? left : right;
          });
          pointForText = poly.getInteriorPoint().getCoordinates();
          break;
        case 'Polygon':
          pointForText = geometry.getInteriorPoint().getCoordinates();
          break;
        default:
          if (coordinates) {
            pointForText = geometry.getClosestPoint(coordinates);
          } else {
            var ext = geometry.getExtent(); 
            pointForText = ol.extent.getCenter(ext);
          }
      }
      // create a new feature to display the text
      textFeature = new ol.Feature({
        geometry: new ol.geom.Point(pointForText),
      });
      textFeature.set("justText", CSV2HTML(text));
      // and add it to the selectedFeaturesLayer
      selectedFeaturesLayer.getSource().addFeature(textFeature);
    }
    // Also add the feature itself so it gets highlighted
    // as the original feature this has all the same properties, such as layerindex
    selectedFeaturesLayer.getSource().addFeature(feature);
    selectedFeaturesIds.push(fid);
  }
}

function HeadAndDesc(head, desc, ev, fnHead, fnBody) {
  // return a string with a heading/description pair eg that can be appended
  // the ev argument is a string (eg "", or "ev") that is inserted into the id of the element - for the CSS
  // Note that js call by reference is complicated so we do not use it
  // See http://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language
  // the fnHead & fnBody (links) must have been processed by encodeURI before calling HeadAndDesc
  var s = "";

  if (head) {
    if (fnHead) s += '<a target="_blank" title="Click to follow the link in a new tab" href="' + fnHead + '">';
    s += '<p class="results' + ev + 'Head">' + CSV2HTML(head) + '</p>';
    if (fnHead) s += '</a>';
  } 

  if (desc) {
    if (fnBody) s += '<a target="_blank" title="Click to follow the link in a new tab" href="' + fnBody + '">';
    s += '<p class="results' + ev + 'Body">' + CSV2HTML(desc) + '</p>';
    if (fnBody) s += '</a>';
  } 

  return s;
}
