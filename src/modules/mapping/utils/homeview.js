import OLView from 'ol/view';
import OLProj from 'ol/proj';

// TODO stubs
const askwhethertoreenable = () => null;
const interactionsDisabled = false;
const showJustClicked = () => null;

export function homeview(OPSDetails) {
  const homeV = new OLView({
    center: OLProj.transform([parseFloat(OPSDetails.Lon), parseFloat(OPSDetails.Lat)], 'EPSG:4326', 'EPSG:3857'),
    zoom: OPSDetails.Zoom,
    rotation: OPSDetails.Rotation,
  });
  return homeV;
}

export function returntohomeview(map, OPSDetails) {
  askwhethertoreenable();
  if (!interactionsDisabled) {
    map.getView().setCenter(homeview(OPSDetails).getCenter()); // Initial Lon and Lat for the OPS
    map.getView().setZoom(homeview(OPSDetails).getZoom()); // Initial Zoom for the study
    map.getView().setRotation(homeview(OPSDetails).getRotation()); // Initial Rotation for the study
    showJustClicked(homeview(OPSDetails).getCenter());
    // togglesidebar("on");
  }
}
