import OlStyle from 'ol/style';

import { getDirectValueOf } from '../utils/mapUtils';
import { replaceOnce } from '../../../global/utils';
import { chosenColor, defaultColor } from './colors';
import { selectedImageStyle } from './styleUtils';

// TODO
const OPSDetails = {};

// ======================= Define the default styles for the vectors ===========================

/*

Style, OR array of Styles (they are applied in order, first at the bottom
- see example of shadow at http://openlayersbook.github.io/ch06-styling-vector-layers/example-06.html
OR Style function (returns an array of Styles): for Layers: function(feature, resolution),
or for Features: function(resolution)
If layer style is undefined the default style is used;
but if it is null only features that have their own styles will be rendered in the layer
Styles can apply to both Layer and/or Feature (which overrides Layer)

Best to cache in an array else the functions are called every render (Not done yet)
- see example at http://openlayersbook.github.io/ch06-styling-vector-layers/example-07.html

??Book of Open Layers PDF p 164 - font size depends on resolution

In layerFromDef if style is specified in OPS layerDef (currently not) then it is used
Note that Ainslie 1804 areas are MultiPolygons and hence 'yellow'.

NEW - now else used geometryStyleFunction, which uses defaultStyles (for each geometry type)
*/

// Called by defaultPointStyleArray, which is called by defaultStyles,
//   which is called by defaultGeometryStyleFunction,
//     which is where all features get their style from, unless specifically defined otherwise
// Image (for points only): Icon, and Circle for the exact point - possibly in an array of styles
export function pointStyleArray(pinIn, symbolIn, colorIn, radiusIn) {
  // Return an array of up to 3 styles: a pin (type is 1-10),
  //  a symbol (filename is 'Air-Balloon' to 'Zoo'), a circle of the given color
  // To indicate none: for a pin 0 is used , for a symbol '' is used, for the circle the radius is 0
  // We can assume that none of the arguments are undefined

  // The icons folder is either specific to the OPS or general
  const iconsFolder = OPSDetails.IconsFolder ? OPSDetails.IconsFolder : 'icons/default-icons/';
  const iconsSize = '24'; // for now
  const pinsSize = '32'; // for now - bigger than the icons so they go inside the pins

  // If there is color and nothing else then assume we want a circle of that color
  let pin = 0;
  let symbol = '';
  let color = '';
  let radius = 0;
  if (pinIn) pin = pinIn;
  if (symbolIn) symbol = symbolIn;
  if (colorIn) color = colorIn;
  if (radiusIn) radius = radiusIn;
  if (color && !radius) {
    radius = 5; // just a color means a default circle
  }
  if (!pin && !symbol && !radius && !color) {
    console.log('pointStyleArray called with no valid arguments - this should not happen', pin, symbol, color, radius); // eslint-disable-line no-console
  }
  let iconPinStyle = {};
  let iconSymbolStyle = {};
  let iconCircleStyle = {};

  if (pin) {
    iconPinStyle = new OlStyle.Style({
      image: new OlStyle.Icon(/** @type {olx.style.IconOptions} */ ({ // TEMPORARY HARD CODED
        anchorXUnits: 'fraction', // 'fraction' indicates a fraction of the icon, 'pixels' indicates pixels.
        anchorYUnits: 'fraction',
        anchorOrigin: 'top-left', // Default is top-left
        anchor: (pin === 5) ? [0, 1] : [0.5, 1],
        // Default value is [0.5, 0.5] (icon center); Pin 5 points to its bottom left
        src: `${iconsFolder}pins/${pinsSize}/pin${pin}.png`, // Image source URI. Required.
        opacity: 1, // Default is 1
        rotation: 0, // in radians (positive rotation clockwise)
        rotateWithView: false, // whether to rotate the icon with the view
      })),
    });
  }

  /*
  Other elements that can be used for icons (from documentation):-
    crossOrigin: null - see https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
    img: image object for the icon. If the src option is not provided
      then the provided image must already be loaded.
      And in that case, it is required to provide the size of the image, with the imgSize option.
    imgSize: (only) required if img is set and src is not,
      and for SVG images in Internet Explorer 11.
      The provided imgSize needs to match the actual size of the image.
    size: in pixel. Can be used together with offset to define the sub-rectangle
       to use from the origin (sprite) icon image.
    color: '#4271AE', // (example) tints the icon
    offset: together with the size and the offset origin,
      define the sub-rectangle to use from the original icon image.
      Default value is [0, 0].
    offsetOrigin: origin of the offset: bottom-left, bottom-right,
      top-left or top-right. Default is top-left.
    scale: number
    snapToPixel: if true integral numbers of pixels are used as the X and Y pixel coordinate
      when drawing the icon
  */

  if (symbol) {
    if (pin) {
      iconSymbolStyle = new OlStyle.Style({
        image: new OlStyle.Icon(/** @type {olx.style.IconOptions} */ ({
          anchorXUnits: 'fraction', // 'fraction' indicates a fraction of the icon, 'pixels' indicates pixels.
          anchorYUnits: 'fraction',
          anchorOrigin: 'top-left', // Default is top-left
          anchor: (pin === 5) ? [0, 2] : [0.5, 2],
          src: `${iconsFolder}symbols/${iconsSize}/${symbol}.png`, // Image source URI. Required. Must be correct case
          color: 'rgba(255, 255, 255, 0.5)', // so it shows white over the pin
          opacity: 1, // Default is 1
          scale: 0.5, // To fit in the pin
          rotation: 0, // in radians (positive rotation clockwise)
          rotateWithView: false, // whether to rotate the icon with the view
        })),
      });
    } else { // There is no pin
      iconSymbolStyle = new OlStyle.Style({
        image: new OlStyle.Icon(/** @type {olx.style.IconOptions} */ ({
          anchorXUnits: 'fraction', // 'fraction' indicates a fraction of the icon, 'pixels' indicates pixels.
          anchorYUnits: 'fraction',
          anchorOrigin: 'top-left', // Default is top-left
          anchor: [0.5, 0.5], // Default value is [0.5, 0.5] (icon center)
          src: `${iconsFolder}symbols/${iconsSize}/${symbol}.png`, // Image source URI. Required. Must be correct case
          // color: color?color:'rgba(0, 0, 0, 0.5)', // color if given, else black
          opacity: 1, // Default is 1
          scale: 0.5, // To fit in the pin
          rotation: 0, // in radians (positive rotation clockwise)
          rotateWithView: false, // whether to rotate the icon with the view
        })),
      });
    }
  }

  if (radius) {
    iconCircleStyle = new OlStyle.Style({
      image: new OlStyle.Circle({
        radius,
        fill: new OlStyle.Fill({
          color: color || 'rgba(255, 0, 0, 0.5)',
        }),
        stroke: new OlStyle.Stroke({ color: color || 'rgba(255, 0, 0, 0.5)', width: 1 }),
      }),
    });
  }

  const styleArray = [];
  if (pin) styleArray.push(iconPinStyle);
  if (symbol) styleArray.push(iconSymbolStyle);
  if (radius) styleArray.push(iconCircleStyle);
  return styleArray;
}

// Called by defaultStyles, which is called by defaultGeometryStyleFunction,
//     which is where all features get their style from, unless specifically defined otherwise
// Image (for points only): Icon, and Circle for the exact point - possibly in an array of styles
export function defaultPointStyleArray(feature, resolution, layerIndex) {
  let pin = 0;
  let symbol = '';
  let color = '';
  let radius = 0;
  if (feature.get('pin')) pin = feature.get('pin');
  if (feature.get('symbol')) symbol = feature.get('symbol');
  if (feature.get('color')) color = feature.get('color');
  if (feature.get('radius')) radius = feature.get('radius');
  if (document.getElementById('wantIcons').checked && (pin || symbol || color || radius)) {
    return pointStyleArray(pin, symbol, color, radius);
  }
  return pointStyleArray(0, '', chosenColor(feature, defaultColor('Circle', layerIndex)), 5);
  // The array returned here has one element: just a circle of the colour for the layer
}

// Called by defaultGeometryStyleFunction, which is where all features get their style from,
//  unless specifically defined otherwise
export function defaultStyles(feature, resolution, selected) {
  // selected is true when called for the selectedFeaturesLayer
  const layerIndex = getDirectValueOf('layerIndex', feature); // should be 2-4, MFL is null hence ""
  // Use ldFromLayer(layerIndex); to override?
  // getType() is One of 'Point', 'LineString', 'LinearRing', 'Polygon',
  //  'MultiPoint', 'MultiLineString', 'MultiPolygon', 'GeometryCollection', 'Circle'.
  let defStyle = {};
  let selStyle = {};
  let chColor = 0;
  switch (feature.getGeometry().getType()) {
    case 'Point':
    case 'MultiPoint':
      defStyle = defaultPointStyleArray(feature, resolution, layerIndex);
      if (selected) {
        selStyle = new OlStyle.Style({
          image: selectedImageStyle(defaultColor('Point', layerIndex)),
        });
        return selStyle;
      } // not selected
      return defStyle;

    case 'LineString':
      chColor = chosenColor(feature, defaultColor('LineString', layerIndex));
      defStyle = new OlStyle.Style({
        stroke: new OlStyle.Stroke({
          color: chColor,
          width: 2,
        }),
      });
      if (selected) {
        selStyle = new OlStyle.Style({
          stroke: new OlStyle.Stroke({
            color: chColor,
            width: 4,
          }),
        });
        return selStyle;
      } // not selected
      return defStyle;


    case 'MultiLineString':
      chColor = chosenColor(feature, defaultColor('MultiLineString', layerIndex));
      defStyle = new OlStyle.Style({
        stroke: new OlStyle.Stroke({
          color: chColor,
          width: 2,
        }),
      });
      if (selected) {
        selStyle = new OlStyle.Style({
          stroke: new OlStyle.Stroke({
            color: chColor,
            width: 4,
          }),
        });
        return selStyle;
      } // not selected
      return defStyle;


    case 'Polygon':
      chColor = chosenColor(feature, defaultColor('Polygon', layerIndex));
      defStyle = new OlStyle.Style({
        stroke: new OlStyle.Stroke({
          color: chColor,
          lineDash: [4],
          width: 2,
        }),
        fill: new OlStyle.Fill({
          color: replaceOnce(chColor, '1.0)', '0.1)'),
        }),
      });
      if (selected) {
        selStyle = new OlStyle.Style({
          stroke: new OlStyle.Stroke({
            color: chColor,
            // lineDash: [4],
            width: 4,
          }),
          fill: new OlStyle.Fill({
            color: replaceOnce(chColor, '1.0)', '0.1)'),
          }),
        });
        return selStyle;
      } // not selected
      return defStyle;


    case 'MultiPolygon':
      chColor = chosenColor(feature, defaultColor('MultiPolygon', layerIndex));
      defStyle = new OlStyle.Style({
        stroke: new OlStyle.Stroke({
          color: chColor,
          lineDash: [4],
          width: 2,
        }),
        fill: new OlStyle.Fill({
          color: replaceOnce(chColor, '1.0)', '0.1)'),
        }),
      });
      if (selected) {
        selStyle = new OlStyle.Style({
          stroke: new OlStyle.Stroke({
            color: chColor,
            // lineDash: [4],
            width: 4,
          }),
          fill: new OlStyle.Fill({
            color: replaceOnce(chColor, '1.0)', '0.1)'),
          }),
        });
        return selStyle;
      } // not selected
      return defStyle;


    case 'GeometryCollection':
      chColor = chosenColor(feature, defaultColor('GeometryCollection', layerIndex));
      defStyle = new OlStyle.Style({
        stroke: new OlStyle.Stroke({
          color: chColor,
          lineDash: [5],
          width: 2,
        }),
        fill: new OlStyle.Fill({
          color: replaceOnce(chColor, '1.0)', '0.1)'),
        }),
      });
      if (selected) {
        selStyle = new OlStyle.Style({
          stroke: new OlStyle.Stroke({
            color: chColor,
            // lineDash: [5],
            width: 4,
          }),
          fill: new OlStyle.Fill({
            color: replaceOnce(chColor, '1.0)', '0.1)'),
          }),
        });
        return selStyle;
      } // not selected
      return defStyle;


    case 'Circle':
      console.log('We dont expect to be here!'); // eslint-disable-line no-console
      chColor = chosenColor(feature, defaultColor('Circle', layerIndex));
      return new OlStyle.Style({
        stroke: new OlStyle.Stroke({
          color: chColor,
          width: 2,
        }),
        fill: new OlStyle.Fill({
          color: replaceOnce(chColor, '1.0)', '0.2)'),
        }),
      });

    default:
      return defaultPointStyleArray(feature, resolution, layerIndex);
  }
}

// This function is where all features get their style from,
// unless defined specifically in the Layer Definition
export function defaultGeometryStyleFunction(feature, resolution) {
  // MFL has no hidden, so getDirectValueOf returns '' and must not be hidden
  if (!getDirectValueOf('hidden', feature) === true) return defaultStyles(feature, resolution, false);
  return null;
  // So to hide a feature, use feature.set('hidden', true);
}
