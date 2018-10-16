// Ensure VueLayer components are all imported here, and 'used' below
// NOte that eg View is part of Map so does not need a separate mention
import {
  Map,
  TileLayer,
  OsmSource,
} from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader

export default function initialiseVueLayers(Vue) {
  // See import above
  Vue.use(Map);
  Vue.use(TileLayer);
  Vue.use(OsmSource);
}
