/* eslint-disable no-console, no-multiple-empty-lines, no-empty, no-unused-vars, max-len, padded-blocks */
// import _ from 'lodash';
// import { protectionStatusEnum, userRightsEnum } from '../../global/constants';
import { actions } from 'vuex-api';
import { initialOpsCode } from '../../initialising/initialState';
import { userRightsEnum } from '../../global/constants';
import store from '../../store';
import { isEmptyArray } from '../../global/utils';

// Called in beforeEnter for the /maps/ route
//   check whether the current user can do everything in the URL (parsed into *to*)
//   move any valid aspects of the URL from here into the relevant part of the vuex store (see SourcesOfTruth.md)
//   and then report any issues and/or move the data to the relevant bits of vuex and let the maps component open
export default function validateUserAndSetInitialValues(to, from, next) {
  console.log('validate to/state', to.params, store.state);

  // Find out about the current user and desired OPS
  const currentUser = store.state.users.account;
  let currentUserName = 'Guest';
  let currentUserLoggedIn = false;
  if (currentUser.user) {
    currentUserName = currentUser.user.username;
    currentUserLoggedIn = currentUser.status.loggedIn;
  }
  const currentOPSCode = store.getters.place.OPSCode;
  let desiredOPSCode = to.params.ops || initialOpsCode;

  // Validate the OPS
  const result = { errorsToReport: [] };
  let place = store.getters.getPlaceFromPlaces(desiredOPSCode);
  if (!place) {
    result.errorsToReport.push(`${desiredOPSCode} is an Unknown study, so we show the default`);
    // Assume default is Unprotected
    desiredOPSCode = initialOpsCode;
    place = store.getters.getPlaceFromPlaces(desiredOPSCode);
    // Ignore all the other params - we will just have the defaults
  }

  // Validate the User's access to that OPS
  const usersBestRight = store.getters.bestRightForOPS(desiredOPSCode);
  console.log(`UBR for ${currentUserName} in ${desiredOPSCode} is ${usersBestRight}`);
  const placeIsProtected = place.Protected;
  // Note that the higher rights are the more limited they are
  if (placeIsProtected && (!currentUserLoggedIn || usersBestRight > userRightsEnum.opsViewer)) {
    result.errorsToReport.push(`${desiredOPSCode} is protected and you do not have the required rights`);
    next(false);
  }
  // Here we know we want a valid study that we are allowed to see
  store.dispatch(
    'updateCurrentOptionArray',
    store.getters.getOptionsArrayByPlace(desiredOPSCode),
  ).then(() => store.dispatch(actions.request, {
    baseURL: process.env.VUE_APP_BACKEND_URL,
    url: `places/${desiredOPSCode}`,
    keyPath: ['place'],
  })).then(() => {
    console.log('B');
    // Validate the layers
    const desiredLayers = (to.params.layers || '').split('/');
    if (isEmptyArray(desiredLayers)) {
      store.dispatch('initialiseChosenLayers', desiredOPSCode)
        .then(() => 'Done0');
    } else {
      const desiredOpacities = (to.params.opacities || '').split('/');
      const layerPromises = [];
      desiredLayers.forEach((layerTitle, i) => {
        const layerDef = store.getters.getOPSAllLayerDefsArrayByTitle(layerTitle);
        const opacity = (desiredOpacities[i - 1] / 100); // Undefined is OK
        console.log(`${i}) ${layerTitle}`, layerDef.displaytype, layerDef.ldid, opacity);
        layerPromises.push(
          store.dispatch('setLayer', {
            ldid: layerDef.ldid,
            layerNumber: i,
            displaytype: layerDef.displaytype,
            opacity,
          }),
        );
      });
      Promise.all(layerPromises).then(() => 'DoneX');
    }
  })
    .then(() => {
      console.log('C');
      // Get the view
      const viewToUse = { ...store.getters.homeView };
      if (to.params.pathMatch === '/Z' && to.params.ZoomOrFitTo) { // is a Zoom spec
        viewToUse.Zoom = to.params.ZoomOrFitTo;
        const { Lon } = to.params;
        if (Lon) viewToUse.Lon = Lon;
        const { Lat } = to.params;
        if (Lat) viewToUse.Lat = Lat;
      }
      store.dispatch('updateView', viewToUse);

      // We are done validating
      console.log('D');
      if (result.errorsToReport.length) {
        console.log('Errors', result.errorsToReport);
      }

      console.log('OK ToCarryOn');

      next(); // the router can carry on and load M4OPSView.vue
    });
  console.log('Z');


}

/* eslint-enable no-console, no-multiple-empty-lines, no-empty, no-unused-vars, max-len */
