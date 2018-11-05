/*

function ldindexFromLdId(LayerDefs = [], ldid) {
  const result = LayerDefs.findIndex(ld => ld.ldid === ldid);
  if (result === -1) console.log(`No ${ldid} found in LayerDefs`); // eslint-disable-line no-console
  return result;
}

/*
The "LayerDefsArray" has zero or more elements each of which is an object containing
either one object "layerdef" that has the text of js code for loading, or ...
"layertype", "category", "title", "layerdescription", "candownload" (eg as PNG),
   "sourcedef" ("url",  "attribution"), "extent", "minZoom", "maxZoom", "tilePixelRatio"
also??"projection", "mapkey", "minx", "miny", "maxx", "maxy"

layerFromDef transforms one element and returns an ol.layer object
 * /
export function layerFromDef(LayerDefs, ldid) {
  const ldindex = ldindexFromLdId(LayerDefs, ldid);
  if (ldindex <= 0) return {};
  const ld = LayerDefs[ldindex];
  const titleToUse = (ld.title) ? ld.title : 'unknown';
  const folderToUse = (ld.folder) ? ld.folder : '';
  let layerToReturn = {};

  if (isDefined(ld.layerscript)) { // the layerdef is a simple layerscript
    // was eval(`return ( new ol.layer.${ld.layerscript})`); // was jQuery.globalEval
    console.log('layerscript not processed', ld.layerscript); // eslint-disable-line no-console

********************************************************************************************************************

  } else if (ld.layertype === 'Tile') { // the layerDef is in its elements


    TODO
    if (ld.source) { // this is a proper Open Layers source already (eg the Universal Layers)
      layerToReturn.setSource(ld.source);
    }

    TODO
    if (ld.extent) {
      layerToReturn.setExtent(OlProj.transformExtent(ld.extent, 'EPSG:4326', 'EPSG:3857'));
    } else if (ld.minx) { // minx, miny, maxx, maxy must all be there or all absent
      const extent = [ld.minx, ld.miny, ld.maxx, ld.maxy];
      layerToReturn.setExtent(OlProj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857'));
    }
    layerToReturn.candownload = string2bool(ld.candownload, false);
    layerToReturn.fromLayerDef = ldindex; // used to get back from Layer to LayerDef (old way)
    layerToReturn.ldid = ldid; // used to get back from Layer to LayerDef

    /* need resolutions rather than zooms??? Have moved these to sourcedef
    if (ld.minZoom) layerToReturn.minZoom = ld.minZoom;
    if (ld.maxZoom) layerToReturn.maxZoom = ld.maxZoom;
    if (ld.tilePixelRatio) layerToReturn.tilePixelRatio = ld.tilePixelRatio;
    * /
    return layerToReturn;

********************************************************************************************************************
  } else if (ld.layertype === 'Vector') { // the layerDef is for features
    layerToReturn = new OlLayerVector({
      title: titleToUse,
    });
    if (ld.sourcedef) {
      layerToReturn.setSource(sourceVectorFromDef(ld.sourcedef));
    }

    let propertyequivtoshorttext = ''; // indicates no action
    if (ld.equivalencies) {
      layerToReturn.set('equivalencies', ld.equivalencies);
      // Set the property "shorttext" from its equivalent if it is not set
      if (ld.equivalencies.shorttext) {
        propertyequivtoshorttext = ld.equivalencies.shorttext;
        // setting propertyequivtoshorttext means that this required action
        //   is included in processFeatures
      }
    }
    if (ld.style) {
      layerToReturn.setStyle(new OlStyleStyle(ld.style));
    } else {
      layerToReturn.setStyle(defaultGeometryStyleFunction);
      // Remember that we cannot have an array of functions
    }
    layerToReturn.candownload = string2bool(ld.candownload, false);
    layerToReturn.fromLayerDef = ldindex; // used to get back from Layer to LayerDef
    layerToReturn.ldid = ldid; // used to get back from Layer to LayerDef

    // Do the Equivalencies, HideUnhideForTime, preload Images and HTMLs, set featureid
    processFeatures(layerToReturn, {
      propertyequivtoshorttext, HideUnhide: true, doImages: true, doHTMLs: true, setfeatureid: true,
    });

    return layerToReturn;

    ********************************************************************************************************************

} else if (ld.layertype === 'VectorTile') { // the layerDef is for vector tiles (eg MapZen OSM)
    layerToReturn = new OlLayerVectorTile({
      title: titleToUse,
    });
    if (ld.source) {
      layerToReturn.setSource(ld.source);
    }

    if (ld.style) {
      layerToReturn.setStyle(new OlStyleStyle(ld.style));
    } else {
      layerToReturn.setStyle(defaultGeometryStyleFunction);
      // Remember that we cannot have an array of functions
    }
    layerToReturn.candownload = string2bool(ld.candownload, false);
    layerToReturn.fromLayerDef = ldindex; // used to get back from Layer to LayerDef
    layerToReturn.ldid = ldid; // used to get back from Layer to LayerDef

    return layerToReturn;
********************************************************************************************************************
 ********************************************************************************************************************
  } else if (ld.layertype === 'Series') { // the layerDef is for a series of layers (possibly groups)
    // Note that Series can only be at Base, and we handle much of it elsewhere
    // ignore attribution (NA), min/maxZoom (?)
    layerSeries.clear();
    if (ld.sourcedef) {
      layerSeries = layerCollectionFromDef(ld.sourcedef);
      ({ layerToReturn } = layerSeries.getArray()); // We return here just the first in the series
    }
    layerToReturn.ldid = ldid; // used to get back from Layer to LayerDef
    return layerToReturn;
********************************************************************************************************************

********************************************************************************************************************
function groupExtentFromDef(LayerDefs, sdef) {
  // return an extent that includes all the extents of the layers specified
  if (sdef.url) { // should be a string array of layers
    const layerTitles = getLayerTitles(sdef.url);
    let extent;
    layerTitles.forEach((layerTitle) => {
      const ldindex = indexOfArrayM4(LayerDefs, layerTitle, 'title');
      if (ldindex > -1) {
        const layer = layerFromDef(ldindex);
        if (layer) {
          const layerExtent = layer.getExtent();
          if (layerExtent) {
            extent = (extent ? OlExtent.extend(extent, layerExtent) : layerExtent);
          } else {
            console.log(`Cannot find layerExtent for ${layerTitle}`, layer, 'Correct and recompile'); // eslint-disable-line no-console
          }
        } else {
          console.log(`Cannot find LayerDef for ${layerTitle}`, layer); // eslint-disable-line no-console
        }
      } else {
        console.log(`Cannot find Layer ${layerTitle}`); // eslint-disable-line no-console
      }
    });
    return extent;
  }
  console.log(sdef, ' has no string array of layers'); // eslint-disable-line no-console
  return null;
}
*/
