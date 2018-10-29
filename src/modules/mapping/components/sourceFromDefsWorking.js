/*


import { attributionFromCode } from '../utils/mapUtils';
import { beginsWith, befaft } from '../../../global/utils';
import { fullOpsURL } from '../../geography/geogUtils';
import { bingApiKey } from '../../../global/constants';

export const sourceVectorFromDef = (sdef) => {
  let sourceToReturn;
  const atts = [];
  if (sdef.attribution) {
    atts[0] = attributionFromCode(sdef.attribution);
  } // we do not cope with there being multiple attributions in the LayerDef yet
  if (sdef.url) { // we standardise on there being only one url
    const ext = befaft(sdef.url, '.')[1].toLowerCase(); // assumes only one period
    const url = fullOpsURL(sdef.url);
    let srcFormat;
    switch (ext) {
      case 'geojson':
        srcFormat = new OlFormatGeoJSON({ defaultDataProjection: 'EPSG:4326' }); // assumed always 'EPSG:4326'
        break;
      case 'gml-NOT YET':
        srcFormat = new OlFormatGML2({
          defaultDataProjection: 'EPSG:27700',
          srsName: 'EPSG:27700',
        }); // assumed UK OS and GML2 for now
        break;
      default:
        alert(`Vector source extension ${ext} unknown. URL = ${sdef.url}`); // eslint-disable-line no-alert
        break;
    }

    sourceToReturn = new OlSourceVector({
      url,
      format: srcFormat,
      attributions: atts,
    });
    return sourceToReturn;
  }
  return null;
};

export const sourceXYZFromDef = (sdef, folder, givenstorageName, OPSCode) => {
  // the string storageName is either AWSS3 (use m4opsprod bucket on AWS S3),
  //   AWSS3DEV (use m4opsdev bucket on AWS S3)
  //    or ShowMaps [was TRUE] (use folders in ../ShowMaps/), or ShowMapsDev [default if null]
  //    (use folders in ../ShowMapsDev/)
  const storageName = (givenstorageName || 'ShowMapsDev');
  let sourceToReturn;
  // we standardise on using the attributions array, so any (single) attribution is turned into
  // the first of the (multiple) attributions array  const atts = [];
  const atts = [];
  if (sdef.attribution) {
    atts[0] = attributionFromCode(sdef.attribution);
  } // we do not cope with there being multiple attributions in the LayerDef yet

  let urlsToUse = [];
  if (sdef.urls) {
    const { urls } = sdef;
    urlsToUse = urls;
  } else if (sdef.url) { // For our maps we standardise on there being only one url
    let { url } = sdef;

    if (!beginsWith(url, 'http')) {
      // it is in short form and needs topping and tailing to use tileserver or AWS
      if ((sdef.origin ? sdef.origin : 'topleft') === 'topleft') {
        // The tiling is OpenGIS (top left origin) = M4OPS default for tileserver,
        //  and MapTiler default
        let baseurl;
        if (storageName.substr(0, 5) === 'AWSS3') { // There is no folder structure as it is not easy to do
          // Note that s3-eu-west-1 is for a bucket in the EU (Ireland) region
          baseurl = `https://s3-eu-west-1.amazonaws.com/m4ops${(storageName.substr(5, 3) === 'DEV') ? 'dev' : 'prod'}/${url}`;
        } else {
          baseurl = `tileserver-php-master/${OPSCode}/${folder ? (`${folder}/`) : ''}${url}`;
          if (storageName === 'ShowMaps') {
            baseurl = `../ShowMaps/${baseurl}`; // this works in both Dev and production
          }
        }
        url = `${baseurl}/{z}/{x}/{y}.png`;
        /* Tried, but tileserver can only do top left origin,
        so in LayerDefs 'origin' has been removed or left blank
      } else if (sdef.origin?sdef.origin:'topleft' === 'bottomleft') {
        // The tiling is OSGEO (bottom left origin) = gdal2tiles default
        url = "tileserver-php-master/" + OPSDetails.OPSCode + "/" + url + "/{z}/{x}/{-y}.png";
        * /
        urlsToUse = [url];
      } else {
        console.log('Error in sourceXYZFromDef for origin=', sdef.origin); // eslint-disable-line no-console
      }
    }
    const minZoom = sdef.minZoom ? sdef.minZoom : 0; // default is 0
    const maxZoom = sdef.maxZoom ? sdef.maxZoom : 18; // default is 18

    let projection = OlProj.get('EPSG:3857'); // The default
    // We need to set the extent of each projection, else the transforms do not work properly,
    //  so we will just setExtent them equal to this, the default (for EPSG:3857)
    const extent3857 = projection.getExtent();

    if (sdef.proj3857D) { // We need a shifted projection
      projection = OlProj.get(sdef.proj3857D); // It will already have been defined
      projection.setExtent(extent3857); // extent is needed to enable reprojection
    }

    sourceToReturn = new OlSourceXYZ({
      urlsToUse,
      projection,
      attributions: atts,
      minZoom,
      maxZoom,
    });
    // console.log(url,$.extend({}, projection));

    /* need resolutions rather than zooms??? Was
    if (sdef.minZoom) sourceToReturn.set("minZoom", sdef.minZoom, true);
    // 3rd param: silent = Update without triggering an event.
    if (sdef.maxZoom) sourceToReturn.set("maxZoom", sdef.maxZoom, true); * /

    return sourceToReturn;
  }
  return null;
};

export const sourceWMSFromDef = (sdef) => {
  let sourceToReturn;
  const atts = [];
  if (sdef.attribution) {
    atts[0] = attributionFromCode(sdef.attribution);
  } // we do not cope with there being multiple attributions in the LayerDef yet
  if (sdef.url) { // we standardise on there being only one url
    const { url } = sdef;
    const projection = OlProj.get(sdef.projection ? sdef.projection : 'EPSG:3857'); // The default

    sourceToReturn = new OlSourceTileWMS({
      params: { LAYERS: sdef.layer }, // layer comes from the folder field
      projection,
      attributions: atts,
      url,
    });
    // console.log(url,$.extend({}, projection));

    return sourceToReturn;
  }
  return null;
};

export const sourceBingMapsFromDef = (sdef) => {
  const imagerySet = sdef.imagerySet || 'Aerial';

  // BingMaps has its own attributions
  const sourceToReturn = new OlSourceBingMaps({
    key: bingApiKey,
    imagerySet,
    minZoom: 0,
    maxZoom: 19,
  });

  return sourceToReturn;
};
*/
