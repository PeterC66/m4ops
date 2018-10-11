import { pdcArraySearch, isEmpty } from '../../../global/utils';
import { ldFromLayer } from '../utils/mapUtils';
import { styleArraysIndex } from './styleUtils';

// TODO temporary
const M4OPS = {};
// TODO
const OPSDetails = {};

// For colours see http://www.w3schools.com/colors/ etc

export function rgbaize(rgb) {
  // The colour strings must have 1.0 as the fourth (a) parameter, so opacity can be changed
  if (rgb) {
    return `rgba(${rgb}, 1.0)`;
  } return null;
}

export function typeColor(type, ColourSet) {
  if (ColourSet) {
    switch (type) {
      case 'Point':
      case 'MultiPoint':
      case 'Circle':
        return rgbaize(ColourSet.pointRGB);

      case 'LineString':
        return rgbaize(ColourSet.lineRGB);

      case 'MultiLineString':
        return rgbaize(ColourSet.multilineRGB);

      case 'Polygon':
        return rgbaize(ColourSet.polygonRGB);

      case 'MultiPolygon':
        return rgbaize(ColourSet.multipolygonRGB);

      case 'GeometryCollection':
        return rgbaize(ColourSet.geometrycollectionRGB);

      default:
        console.log(`Error in typeColor for type = ${type}`, ColourSet); // eslint-disable-line no-console
        return rgbaize('255, 0, 0'); // red
    }
  }
  return null;
}

export function defaultColor(type, layerindex) {
  // Look up the ColourSet specified for this layer, if given
  let layerColourSet;
  let strRGBA;
  if (OPSDetails.ColourSetsArray) {
    if (layerindex) {
      const LD = ldFromLayer(layerindex);
      if (LD) {
        layerColourSet = pdcArraySearch(LD.csname.ColourSetsArray, 'csname');
      }
    } else { // No layerindex, so MFL
      layerColourSet = pdcArraySearch(OPSDetails.csnameMFL.ColourSetsArray, 'csname');
    }
  }
  if (layerColourSet) { // there is a valid ColourSet specified for this layer
    strRGBA = typeColor(type, layerColourSet);
    if (strRGBA) return strRGBA;
  } else if (M4OPS.DefaultColourSetsArray) {
    // Given the geometry type and layerindex (values 2-4 and undefined=MFL)
    // return the default colour
    const layerDefaultColourSet = M4OPS.DefaultColourSetsArray[styleArraysIndex(layerindex)];
    if (layerDefaultColourSet) {
      strRGBA = typeColor(type, layerDefaultColourSet);
      if (strRGBA) return strRGBA;
    } else {
      console.log(`Error with layerDefaultColourSet, layerindex = ${layerindex}`); // eslint-disable-line no-console
      return 'rgba(255, 0, 0, 1.0)'; // red
    }
  } else {
    console.log('Error no DefaultColourSetsArray'); // eslint-disable-line no-console
    return 'rgba(255, 0, 0, 1.0)'; // red
  }
  return null;
}

export function chosenColor(feature, defaultColorToUse) {
  // Returns the relevant colour for the feature as an rgba string
  const comboid = document.getElementById('SelectColour');
  const colourSelected = comboid.selectedIndex - 1;
  if (colourSelected >= 0) {
    // console.log(feature.clone(), defaultColorToUse,colourSelected,OPSDetails.ColoursArray);
    const ceA = OPSDetails.ColoursArray[colourSelected].CEArray;
    for (let i = 0; i < ceA.length; i += 1) {
      const cv = ceA[i].comparevalue;
      // console.log("cv",i,cv);
      if (!isEmpty(cv)) { // Not defined means everything uses this colour
        const fv = feature.get(ceA[i].fproperty);
        // We can assume from FLG that fproperty (the property name) exists
        //   and is a non-empty string
        // console.log("fv",i,fv);
        if (!isEmpty(fv)) {
          // Valid comparetypes are <, >, =, <=, >=, and known to be valid
          const ct = ceA[i].comparetype;
          // console.log("original",fv,typeof fv,ct,cv, typeof cv);
          /* if ($.isNumeric(cv)) { // We want numeric comparison, not string
  // from https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls
            cv -= 0;
            fv -= 0;
          } */
          if ((ct === '<' && fv < cv) || (ct === '>' && fv > cv) || (ct === '=' && fv === cv) || (ct === '<=' && fv <= cv) || (ct === '>=' && fv >= cv)) {
          // console.log("success",i,fv,typeof fv,ct,cv, typeof cv);
            return rgbaize(ceA[i].colour);
          }
        }
      } else { // comparevalue is empty so use this colour
        return rgbaize(ceA[i].colour);
      }
    }
    // If through here then no criterion has been met
    return defaultColorToUse;
  }
  // console.log ('defaultColorToUse', defaultColorToUse);
  return defaultColorToUse;
}
