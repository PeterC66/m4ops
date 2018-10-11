import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

import { ldIdOSM } from '../../../global/constants';
// TODO generalise
const chosenLayers = [{ ldId: ldIdOSM }];
const layer = new OlLayerTile({
  source: new OlSourceOsm(),
});
layer.ldId = chosenLayers[0].ldId; // used to get back from Layer to LayerDef

const center = [788453.4890155146, 6573085.729161344];

// create a new instance of ol.map in ES6 syntax
const map = new OlMap({
  view: new OlView({
    center,
    zoom: 16,
  }),
  layers: [layer],
});

export const initialStateMainMap = map;

export const initialStateChosenLayers = [{ layerNumber: 0, ldId: ldIdOSM }];
