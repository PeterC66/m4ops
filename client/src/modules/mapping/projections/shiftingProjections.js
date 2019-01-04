/* eslint-disable */
import proj4 from 'proj4';
import OlProj from 'ol/proj';

import { paramValueOrDefaultFromOPSDetails } from '../../params/params';

export default function dealWithProjections(OPSDetails) {
  // Projections==========================
  // See conversation in https://gis.stackexchange.com/questions/242984/in-ol3-can-i-adjust-the-georeferencing-of-layers-i-source-from-elsewhere/243029

  // Each LayerDef can have a different projection, as each can be shifted per [shiftEastM;shiftNorthM]
  // These are based on EPSG:3857 (= SR-ORG:6864), so we set what is needed here
  /* eslint max-len: ["error", { "ignoreComments": true }] */
  /* eslint-disable max-len */
  /* cSpell:disable */
  const proj4Def3857 = '+proj=merc +lat_0=0 +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs '; // From http://spatialreference.org/ref/sr-org/6864/
  /* cSpell:enable */
  /* eslint-enable max-len */

  // Check whether want to shift layers
  const dontShift = paramValueOrDefaultFromOPSDetails(OPSDetails, 'NoShift'); // NoShift means don't shift any layers by meters

  const { shiftBase } = OPSDetails;
  const { shiftBaseNorthM = 0 } = shiftBase;
  const { shiftBaseEastM = 0 } = shiftBase;

  function fCoordTransform(shiftEastM, shiftNorthM, strSign) {
    if (dontShift) {
      return 'return [coordinate[0], coordinate[1]]'; // ie No change
    }
    let str = 'return [';
    str += `coordinate[0] ${strSign}`;
    str += ` (${shiftEastM + shiftBaseEastM})`;// Brackets as value can be negative
    str += `, coordinate[1] ${strSign}`;
    str += ` (${shiftNorthM + shiftBaseNorthM})]`;
    return str;
  }

  // Define each shifted projection we need
  const projections = OPSDetails.ProjectionsArray;
  if (projections) {
    for (let i = 0; i < projections.length; i += 1) {
      proj4.defs(projections[i].projName, proj4Def3857); // They all start identical to EPSG:3857
      // We need to create the transform functions as strings
      //  with the only variable being the coordinate parameter
      //  as otherwise the projections get their scope confused
      // Useful: https://rainsoft.io/6-ways-to-declare-javascript-functions/
      // and http://2ality.com/2014/01/eval.html
      /* eslint-disable max-len, no-new-func */
      const fCoordinateTransformForward = new Function('coordinate', fCoordTransform(projections[i].shiftEastM, projections[i].shiftNorthM, '-'));
      // console.log('fCTF', fCoordinateTransformForward);
      // The Backward function is the same except with pluses instead of minuses
      const fCoordinateTransformBackward = new Function('coordinate', fCoordTransform(projections[i].shiftEastM, projections[i].shiftNorthM, '+'));
      // console.log('fCTB', fCoordinateTransformBackward);

      // The transform function is where the shifting is implemented
      OlProj.addCoordinateTransforms(
        'EPSG:3857',
        projections[i].projName,
        fCoordinateTransformForward,
        fCoordinateTransformBackward,
      );
    }
  }
}
