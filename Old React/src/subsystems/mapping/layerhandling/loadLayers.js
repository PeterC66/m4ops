// import _ from 'lodash';

import { layerFromDef } from './layerFromDef';
// import { console.log } from '../../../global/utils';

// TODO stubs
// const askwhethertoreenable = () => null;
// const interactionsDisabled = false;

export const xx = true;

export function olLayersFromChosenLayers(LayerDefs = [], chosenLayers = []) {
  const result = chosenLayers.map(chosenLayer => layerFromDef(LayerDefs, chosenLayer.ldId));
  return result;
}

/*
export function loadLayers(map, nextLayers, LayerDefs) {
  askwhethertoreenable();
  if (!interactionsDisabled) {
    let l = true;
    // while (l) {
    console.log('prepop', _.cloneDeep(map), _.cloneDeep(map.getLayers()));
    l = map.getLayers().pop();
    console.log('popped', _.cloneDeep(l), 'now', _.cloneDeep(map), _.cloneDeep(map.getLayers()));
    // }
    nextLayers.forEach((layer, nextIndex) => {
      const layerToInsert = layerFromDef(LayerDefs, layer.ldId);
      console.log(_.cloneDeep(layer), nextIndex, 'layerToInsert', _.cloneDeep(layerToInsert));
      if (layerToInsert) {
        map.getLayers().insertAt(nextIndex, layerToInsert);
      } else {
        console.log('LayerDefs problem', layer, LayerDefs);
      }
    });
  }
}

export function loadLayersIncremental(map, prevLayers, nextLayers, LayerDefs) {
  askwhethertoreenable();
  if (!interactionsDisabled) {
    let prevIndex = 0;
    nextLayers.forEach((layer, nextIndex) => {
      if (
        (prevIndex < prevLayers.length)
        && (layer.ldId === prevLayers[prevIndex].ldId)
      ) {
        prevIndex += 1;
      } else {
        if (prevLayers.length > 0) map.getLayers().removeAt(nextIndex);
        prevIndex += 1;
        if (
          !(
            (prevIndex < prevLayers.length)
            && (layer.ldId === prevLayers[prevIndex].ldId)
          )
        ) {
          const layerToInsert = layerFromDef(LayerDefs, layer.ldId);
          console.log('layerToInsert', layerToInsert);
          if (layerToInsert) {
            map.getLayers().insertAt(nextIndex, layerToInsert);
          } else {
            console.log('LayerDefs problem', layer, LayerDefs);
          }
        }
      }
    });
  }
} */
