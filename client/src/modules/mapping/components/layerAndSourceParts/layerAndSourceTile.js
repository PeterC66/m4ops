import _ from 'lodash';

import { bingApiKey } from '../../constants';
import { attributionFromCode } from '../../utils/mapUtils';
import { beginsWith } from '../../../../global/utils';

function sourceTile(
  createElement,
  sourcedef,
  folder,
  storageName,
) {
  const {
    url,
    urls,
    vlsource,
    imagerySet,
    attribution,
    minZoom,
    maxZoom,
  } = sourcedef;

  // eslint-disable-next-line max-len
  if (urls) console.log('Warning urls has value - urlS is not handled yet', urls); // eslint-disable-line no-console

  let vlSourceElementTile = {};

  if (vlsource === 'osm') {
    vlSourceElementTile = createElement('vl-source-osm');
  } else if (url === 'BingMaps') {
    vlSourceElementTile = createElement(
      'vl-source-bingmaps',
      {
        props: {
          'api-key': bingApiKey,
          'imagery-set': imagerySet || 'Aerial',
        },
      },
    );
  } else { // we assume all tiles are served by XYZ
    const OPSCode = 'HcN'; // Kludge TODO

    // the string storageName is either AWSS3 (use m4opsprod bucket on AWS S3),
    //   AWSS3DEV (use m4opsdev bucket on AWS S3)
    //    or ShowMaps [was TRUE] (use folders in ../ShowMaps/), or ShowMapsDev [default if null]
    //    (use folders in ../ShowMapsDev/)
    const storageNameToUse = storageName || 'ShowMapsDev';
    const folderToUse = folder || '';
    // we standardise on using the attributions array,
    // but we do not cope with there being multiple attributions in the LayerDef yet
    const atts = attribution ? [attributionFromCode(attribution)] : [];

    let urlToUse = url;
    // For our maps we standardise on there being only one url

    if (url) {
      if (!beginsWith(url, 'http')) {
        // it is in short form and needs topping and tailing to use tileserver or AWS

        // Note that tileserver can only do top left origin, so  OSGEO (bottom left origin) = gdal2tiles default is not possible
        //  so in LayerDefs 'origin' has been removed or left blank, meaning the tiling is OpenGIS
        let baseurl;
        if (storageNameToUse.substr(0, 5) === 'AWSS3') { // There is no folder structure as it is not easy to do
          // Note that s3-eu-west-1 is for a bucket in the EU (Ireland) region
          const devOrProd = (storageNameToUse.substr(5, 3) === 'DEV') ? 'dev' : 'prod'; // eslint-disable-line max-len
          baseurl = `https://s3-eu-west-1.amazonaws.com/m4ops${devOrProd}/${url}`; // eslint-disable-line max-len
        } else {
          console.log('Kludge: OPSCode = HcN'); // eslint-disable-line no-console
          baseurl = `tileserver-php-master/${OPSCode}/${folderToUse ? (`${folderToUse}/`) : ''}${url}`; // eslint-disable-line max-len
          if (storageNameToUse === 'ShowMaps') {
            baseurl = `../ShowMaps/${baseurl}`; // this works in both Dev and production
          }
        }
        urlToUse = `${baseurl}/{z}/{x}/{y}.png`;
      }
    }

    /* TODO ??
    let projection = OlProj.get('EPSG:3857'); // The default
    // We need to set the extent of each projection, else the transforms do not work properly,
    //  so we will just setExtent them equal to this, the default (for EPSG:3857)
    const extent3857 = projection.getExtent();

    if (sdef.proj3857D) { // We need a shifted projection
      projection = OlProj.get(sdef.proj3857D); // It will already have been defined
      projection.setExtent(extent3857); // extent is needed to enable reprojection
    }
    */

    vlSourceElementTile = createElement(
      'vl-source-xyz',
      {
        props: {
          url: urlToUse,
          attributions: atts,
          'min-zoom': minZoom || 0,
          'max-zoom': maxZoom || 18,
        },
      },
    );
  }

  return vlSourceElementTile;
}

export default function layerAndSourceTile(
  createElement,
  layer,
  layerDataObject,
) {
  let vlSourceElementTile = {};
  let vlLayerElementTile = {};
  const {
    ldid,
    sourcedef,
    folder,
    storageName,
  } = layer;
  if (sourcedef) {
    vlSourceElementTile = sourceTile(
      createElement,
      sourcedef,
      folder,
      storageName,
    );
    if (!_.isEmpty(vlSourceElementTile)) {
      vlLayerElementTile = createElement(
        'vl-layer-tile',
        { ...layerDataObject },
        [
          vlSourceElementTile,
        ],
      );
    } else {
      console.log(`Cannot create vlSourceElementTile for ${ldid}`); // eslint-disable-line no-console
    }
  } else {
    console.log(`${ldid} has undefined sourcedef`); // eslint-disable-line no-console
  }
  return vlLayerElementTile;
}
