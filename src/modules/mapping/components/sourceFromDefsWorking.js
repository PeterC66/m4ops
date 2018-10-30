/*


import { attributionFromCode } from '../utils/mapUtils';
import { beginsWith, befaft } from '../../../global/utils';
import { fullOpsURL } from '../../geography/geogUtils';

*****************************************************************************************


*****************************************************************************************

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

*/
