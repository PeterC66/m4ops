import OlStyle from 'ol/style';

import { replaceOnce } from '../../../global/utils';

export function selectedImageStyle(rgba) {
  const imgStyle = new OlStyle.Circle({
    radius: 50,
    fill: new OlStyle.Fill({
      color: rgba ? replaceOnce(rgba, '1.0)', '0.2)') : 'rgba(255, 0, 0, 0.1)',
    }),
    stroke: new OlStyle.Stroke({
      color: rgba || 'rgba(255, 0, 0, 1.0)',
      width: 2,
    }),
  });
  return imgStyle;
}

export function styleArraysIndex(layerIndex) {
  if (!layerIndex || layerIndex < 2 || layerIndex > 4) {
    return 3; // for MFL (and any error)
  }
  return layerIndex - 2; // so 2-4 become 0-2
}
