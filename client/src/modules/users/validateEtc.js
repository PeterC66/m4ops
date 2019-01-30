/* eslint-disable no-console, no-multiple-empty-lines, no-empty, no-unused-vars, max-len, padded-blocks */
import _ from 'lodash';
import { actions } from 'vuex-api';
import { protectionStatusEnum, userRightsEnum } from '../../global/constants';
import { initialOpsCode } from '../../initialising/initialState';
import store from '../../store';
import { isEmptyArray } from '../../global/utils';

export function reasonForNotAllowingLayer(layerDef) {
  // If Layer is allowed then return '' (which is false)
  const { currentUsername, currentUserLoggedIn, place } = store.getters;
  const layerProtection = layerDef.Protected;
  const layerTitle = layerDef.title;
  const placeIsProtected = place.Protected;
  const usersBestRight = store.getters.getCurrentUserBestRightByOPS(place.OPSCode);
  let result = '';

  switch (layerProtection || protectionStatusEnum.Unprotected) {
    case protectionStatusEnum.Unprotected:
      break; // Everyone can see the layer

    case protectionStatusEnum.Protected:
      if (!placeIsProtected) {
        result = currentUserLoggedIn ? '' : `Only logged in users can see ${layerTitle}`;
        break;
      }
      // This case is where someone is logged in but has no rights to this OPS
      result = usersBestRight <= userRightsEnum.opsViewer ? '' : `You don't have permission to see ${layerTitle}`;
      break;

    case protectionStatusEnum.Test:
      result = usersBestRight <= userRightsEnum.opsAdmin ? '' : `Only administrators have permission to see ${layerTitle} (test)`;
      break;

    default:

      if (layerProtection.substr(0, 3) === `${protectionStatusEnum.Personal}_`) {
        if (layerProtection.substr(3) === currentUsername) { // Personal to this user
          break;
        }
        result = `You are not the user who has permission to see ${layerTitle}`;
        break;
      }
      result = `Invalid layerProtection value = ${layerProtection}`;
      break;
  }
  // console.log(`rFNAL ${layerTitle} - ${layerProtection} ${usersBestRight} for ${currentUsername} ${currentUserLoggedIn} > ${result || 'OK'}`);
  return result;
}

// Called in beforeEnter for the /maps/ route
//   check whether the current user can do everything in the URL (parsed into *to*)
//   move any valid aspects of the URL from here into the relevant part of the vuex store (see SourcesOfTruth.md)
//   and then report any issues and/or move the data to the relevant bits of vuex and let the maps component open
export function validateUserAndSetInitialValues(to, from, next) {
  console.log('validate to/state', to.params, store.state);

  // Find out about the current user and desired OPS
  const { currentUsername, currentUserLoggedIn } = store.getters;

  let currentOPSCode = store.getters.place.OPSCode;
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
  const currentUserBestRightForCurrentOPS = store.getters.getCurrentUserBestRightByOPS(desiredOPSCode);
  console.log(`UBR for ${currentUsername} in ${desiredOPSCode} is ${currentUserBestRightForCurrentOPS}`);
  const placeIsProtected = place.Protected;
  // Note that the higher rights are the more limited they are
  if (placeIsProtected && (!currentUserLoggedIn || currentUserBestRightForCurrentOPS > userRightsEnum.opsViewer)) {
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
    currentOPSCode = store.getters.place.OPSCode; // After this point use currentOPSCode rather than desiredOPSCode
    // Validate the layers
    const desiredLayers = (to.params.layers || '').split('/');
    console.log(desiredLayers);
    if (isEmptyArray(desiredLayers) || !desiredLayers[0]) {
      store.dispatch('initialiseChosenLayers', currentOPSCode)
        .then(() => 'Done0');
    } else {
      const desiredOpacities = (to.params.opacities || '').split('/');
      const layerPromises = [];
      desiredLayers.forEach((layerTitle, i) => {
        const layerDef = store.getters.getOPSAllLayerDefsArrayByTitle(layerTitle);
        if (_.isEmpty(layerDef)) {
          result.errorsToReport.push(`${layerTitle} is an unknown layer in this context`);
        } else {
          const opacity = (desiredOpacities[i - 1] / 100); // Undefined is OK
          console.log(`${i}) ${layerTitle} ${layerDef.ldid}`, layerDef);
          const layerIssue = reasonForNotAllowingLayer(
            layerDef,
          );
          if (layerIssue) {
            result.errorsToReport.push(layerIssue);
          } else {
            layerPromises.push(
              store.dispatch('setLayer', {
                ldid: layerDef.ldid,
                layerNumber: i,
                displaytype: layerDef.displaytype,
                opacity,
              }),
            );
          }
        }
      });
      Promise.all(layerPromises).then(() => 'DoneX');
    }
  })
    .then(() => {
      console.log('C');

      // Get the view
      const viewToUse = { ...store.getters.homeView };
      if (to.params.pathMatch === '/Z' && to.params.ZoomOrFitTo) { // is a Zoom spec
        const zoomToUse = parseInt(to.params.ZoomOrFitTo, 10);
        if (zoomToUse >= 0 && zoomToUse <= 23) {
          viewToUse.zoom = zoomToUse;
          const { Lon, Lat } = to.params;
          if (Lon && Lat) viewToUse.center = [parseFloat(Lon), parseFloat(Lat)];
        } else {
          result.errorsToReport.push(`${to.params.ZoomOrFitTo} is an invalid zoom level`);
        }
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
