// Ensure VueLayer components are all imported here, and 'used' below
// An alternative is to import and Vue.use locally in each component
// Note that eg View is part of Map so does not need a separate mention
import {
  Map,
  TileLayer,
  OsmSource,
  BingMapsSource,
  XyzSource,
  WmtsSource,
  VectorLayer,
  VectorSource,
  StyleBox,
  StrokeStyle,
  FillStyle,
  CircleStyle,
} from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader

export default function initialiseVueLayers(Vue) {
  // See import above
  Vue.use(Map);
  Vue.use(TileLayer);
  Vue.use(OsmSource);
  Vue.use(BingMapsSource);
  Vue.use(XyzSource);
  Vue.use(WmtsSource);
  Vue.use(VectorLayer);
  Vue.use(VectorSource);
  Vue.use(StyleBox);
  Vue.use(StrokeStyle);
  Vue.use(FillStyle);
  Vue.use(CircleStyle);
}
