/* cSpell:disable */
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';

export default function initialiseProjections() {
  // The British National Grid - EPSG:27700 from http://openlayers.org/en/latest/examples/reprojection.html
  proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 '
            + '+x_0=400000 +y_0=-100000 +ellps=airy '
            + '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 '
            + '+units=m +no_defs');
  // WAS from NLS proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs');

  // This call to register must follow any new proj4.defs
  register(proj4);
  // we don't use the vl 0.10 addProj (addProjection) and createProj (Projection) - just from ol/proj under another name, same parameters
}
