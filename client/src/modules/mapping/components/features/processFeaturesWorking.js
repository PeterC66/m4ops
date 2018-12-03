/*

  // These are the routines to do things with features (see https://gis.stackexchange.com/questions/215878/how-to-get-the-features-in-a-source-for-a-geojson-vector-layer-and-then-alter-t)
  // We do it all in one place to avoid errors
  //console.log("processFeatures", vectorLayer, options);
  var source = vectorLayer.getSource();
  if (source) {
    var numFeatures = source.getFeatures().length;
    //console.log(numFeatures);
    // Known problem that numFeatures may genuinely be zero
    if (numFeatures==0) {
      vectorLayer.getSource().once('change', function(event){
        source = event.target;
        if (source.getState() === 'ready') {
          return processFeaturesActions(vectorLayer, source, options);
        }
      });
    } else {
      if (source.getState() === 'ready') {
        return processFeaturesActions(vectorLayer, source, options);
      } else {
        consolelog("In processFeatures source found, but not ready", vectorLayer, options, source);
      }
    }
  } else {
    consolelog("In processFeatures no source found", vectorLayer, options);
  }
}

function processFeaturesActions(layer, src, options) {
  // As src is now defined we do all the actions here, guided by the calling parameters
  // The only return value is from the textForSearch option (see below)
  // 8) If we want to set modifiableFeatures (for use elsewhere)
  //console.log("pFActions",layer, src, options);
  if (options["setModifiableFeatures"]) {
    modifiableFeatures = src.getFeatures(); // Note this is an array, not a collection
    setHTMLofNumber("NFeatures", modifiableFeatures.length);
    var setEN = (modifiableFeatures.length==1)?true:false;
    if (setEN) {
      if (modifiableFeatures[0].getGeometry().getType() != 'LineString') setEN = false;
      if (modifiableFeatures[0].getGeometry().getCoordinates().length != 2) setEN = false;
    }
    document.getElementById('btn-EN').style.display  = setEN?"inline-block":"none";
    //console.log(setEN, modifiableFeatures);
  }

  var propertyequivtoshorttext =  options["propertyequivtoshorttext"];
  var HideUnhide = options["HideUnhide"];
  var doImages = options["doImages"];
  var doHTMLs = options["doHTMLs"];
  var setfeatureid = options["setfeatureid"];
  var layerIndex = options["layerIndex"];
  var setOnMFLTo = options["setOnMFLTo"];
  var textForSearch = options["textForSearch"];
  var searchOption = options["searchOption"]; // qualifies textForSearch - see values in globals

  // Check if we want to do anything else
  if (!(propertyEquivToShorttext || hideUnhide || doImages || doHtmls || setFeatureid || layerIndex || setOnMflTo || textForSearch)) return;

  var pseudoFeatureid = -1; // starting value
  var featureids = [];
  var nFound = 0;
  var nFound4WholeWord = 0;
  if (textForSearch) {
    var regex = new RegExp(escapeRegExp(textForSearch),"mi");
    // mi is multiline and case insensitive
    // using g (global) would confuse the test - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    var regex4WholeWord = new RegExp("(^|\\W)" + escapeRegExp(textForSearch) + "($|\\W)","mi");
    // (^|\W) matches any non-word character or the start (NB the \ needs escaping as \\!!!)
    // ($|\W) matches any non-word character or the end
    //console.log(regex,regex4WholeWord);
  }

  src.forEachFeature(function(feature) {
    // 1) If we want to set any missing featureids (because they are missing, or null)
    // Needs to be before setting shorttext in case shorttext needs setting to featureid
    if (setFeatureid) {
      if (!feature.get("featureid")) {
        //console.log("setFeatureid",feature.id,feature.clone());
        if (feature.get("@id")) { // eg from OSM
          feature.set("featureid",feature.get("@id"));
        } else {
          feature.set("featureid",'pseudo' + pseudoFeatureid--);
        }
      } else {
        feature.set("featureid", String(feature.get("featureid"))); // Ensure they are strings
      }
      if (featureids.indexOf(feature.get("featureid")) >= 0) {
        consolelog("Dup fid: " + feature.get("featureid"), feature.clone());
      }
      featureids.push(feature.get("featureid"));
    }
    // 2) If we want to set the shorttext property to be the same as the given property
    if (propertyEquivToShorttext) {
      //console.log("setshorttext",feature.id,feature.clone());
      feature.set("shorttext", getAValueFor("shorttext", feature, layer));
    }
    // 3) If we want to Hide and Unhide, dependent on the timeslider values, and the dates in the feature
    if (hideUnhide) {
      var startDate = new Date(getAValueFor('datestart', feature, layer).toString()); // getAValueFor has default values hard-coded
      var endDate = new Date(getAValueFor('dateend', feature, layer).toString()); // getAValueFor has default values hard-coded
      if (((startDate > upperDate) || (endDate < lowerDate))) {
        feature.set('hidden', true); // Hides it, as the style uses this property
      } else {
        feature.set('hidden', false); // removes any hiding - returns to default for the layer
      }
      //if (feature.get('featureid') == "F_1059") console.log(startDate,upperDate, endDate,lowerDate,feature.get('hidden'),feature.clone());
    }
    // 4) If we want to preload any Images
    if (doImages) {
      if (feature.get("image")) {
        preloadImages([encodedFullOpsURL('Images/', feature.get("image"))]);
      };
    }
    // 5) If we want to preload any HTMLs (May not be needed now we load from Features.csv)
    if (doHtmls) {
      if (feature.get("html")) {
        loadHTML(feature.get("html"));
      };
    }
    // 6) If we want to set the features' layerIndex (for use by defaultStyles)
    // layerIndex being non-null implies to set it
    if (layerIndex) {
      feature.set('layerIndex', layerIndex);
    }
    // 7) If we want to set the features' onMfl (for use for details)
  // onMfl has values False(0) Not on MFL, True(-1) on normal MFL, (also) True(1) on AllFeatures MFL
    if (setOnMflTo) {
      feature.set('onMfl', setOnMflTo);
      // We might want to check if there is any mismatch between the csv and geojson
      // ?? using hasGeometry(csvAsArray[i])
    }
    // 8) setModifiableFeatures is done at the beginning of the function

    // 9) If we want to highlight the features that include the textForSearch (ignoring case)
    if (textForSearch) {
      var boofoundForThisFeature = false;
      var boofound4WWForThisFeature = false; // WW = 4WholeWord
      var props = feature.getProperties();
      //console.log(feature, props);
      for (var key in props) {
        if (props.hasOwnProperty(key)) {
          var prop = props[key];
          //console.log(key, prop, typeof prop);
          if (typeof prop == 'string') {
            if(regex.test(prop)) {
              //console.log(boofoundForThisFeature,nFound,props['featureid'],key,prop); // Rawcliffe?
              if (!boofoundForThisFeature) { // to avoid double counting
                boofoundForThisFeature = true;
                nFound++;
                //console.log("nFound is now " + nFound);
                if (searchOption === searchOptionPlain) selectAndDisplay(feature, options["isMFL"]?null:layer);
              }
              // relying on the search for whole word being a subset of the plain search
              if(regex4WholeWord.test(prop)) {
                //console.log("WW",boofound4WWForThisFeature,nFound,nFound4WholeWord,props['featureid'],key);
                if (!boofound4WWForThisFeature) { // to avoid double counting
                  boofound4WWForThisFeature = true;
                  nFound4WholeWord++;
                  //console.log("nFound4WholeWord is now " + nFound4WholeWord);
                  if (searchOption === searchOptionWholeWord)selectAndDisplay(feature, options["isMFL"]?null:layer);
                }
              }
            }
          }
        }
      }
    }
  });
  if (textForSearch) { // we actually don't need searchOptionCountOnly as we return for all values
    return [nFound, nFound4WholeWord];
  }
}
*/
