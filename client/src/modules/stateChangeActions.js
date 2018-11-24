// Not Needed??

// import { isDefined } from '../global/utils';
// import { isLayerDefined } from './mapping/utils/mapUtils';
// import { layerFromDef } from './mapping/layerhandling/layerFromDef';

// /* functions for onStateChange */
// import { setLayerRequest } from './mapping';

// import { returntohomeview } from './mapping/utils/homeview';
// import {
//   getPlace,
//   fetchPlaceResponse,
// } from './geography';

const stateChangeActions = (prevState, nextState, action) => {
  switch (action.type) {
    // case fetchPlaceResponse.toString():
    //   // Move the map to HomeView when a new place has been loaded
    //   returntohomeview(getMainmap(nextState), getPlace(nextState));
    //   break;

    // case setLayerRequest.toString(): {
    //   // The reducer changes the chosenlayers state
    //   //  so here we reflect the same changes in the map itself
    //   const { LayerDefs } = action;
    //   const map = {};
    //   // for payload see above {ldid:string_index_into_LayerDefsArray, layerNumber: eg 0}
    //   const layerindex = action.payload.layerNumber;
    //   if (!isDefined(action.payload.ldid)) { // indicating to delete the layer
    //     map.getLayers().removeAt(layerindex);
    //   } else {
    //     if (isLayerDefined(map, layerindex)) {
    //       map.getLayers().removeAt(layerindex);
    //     }
    //     const layerToInsert = layerFromDef(LayerDefs, action.payload.ldid);
    //     map.getLayers().insertAt(layerindex, layerToInsert);
    //   }
    //   break;
    // }

    default:
      // do nothing
  }
};

export default stateChangeActions;
