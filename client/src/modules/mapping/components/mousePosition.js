import MousePosition from 'ol/control/MousePosition';

import store from '../../../store';
import { gridrefNumToLet } from '../projections/britishNationalGrid';

function strongNGR(NGR) {
  // Put <strong> around characters so the (TL) 4 digit ref is clear
  const strongON = '<strong>';
  const strongOFF = '</strong>';
  let xNGR = strongON + NGR.slice(0, 4) + strongOFF;
  xNGR += NGR.slice(4, 7);
  xNGR += strongON + NGR.slice(7, 9) + strongOFF;
  xNGR += NGR.slice(9, 12);
  return xNGR;
}

export const mouseposition = new MousePosition({
  projection: 'EPSG:4326',
  coordinateFormat(coordinate) {
    // BNG: ol.extent.applyTransform([x, y], ol.proj.getTransform("EPSG:4326", "EPSG:27700"),
    const coord27700 = ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:27700');
    const templatex = '{x}';
    const outx = ol.coordinate.format(coord27700, templatex, 0);
    const templatey = '{y}';
    const outy = ol.coordinate.format(coord27700, templatey, 0);
    const NGR = gridrefNumToLet(outx, outy, 10);
    const hdms = ol.coordinate.toStringHDMS(coordinate);
    const { zoom } = store.state.mapping.view;
    if ((outx < 0) || (outx > 700000) || (outy < 0) || (outy > 1300000)) {
      return `(Zoom ${zoom})  <strong>${
        ol.coordinate.format(coordinate, '{x}, {y}', 4)
      }&nbsp; <br/>&nbsp;${hdms} &nbsp;`;
    }
    // Zoom, OS MapRef, EPSG:27700, EPSG:4326
    return `(Zoom ${zoom})  ${strongNGR(NGR)}&nbsp; <br/>${
      ol.coordinate.format(coord27700, '{x}, {y}', 0)
    }&nbsp; <br/>${
      ol.coordinate.format(coordinate, '{y}, {x}', 4)
    }&nbsp; <br/>&nbsp;${hdms} &nbsp;`;
  },
});

export const dummy = 1;
