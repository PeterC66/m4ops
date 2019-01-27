// import _ from 'lodash';
import { actions } from 'vuex-api';
// import { protectionStatusEnum, userRightsEnum } from '../../global/constants';
import { initialOpsCode } from '../../initialising/initialState';
import { userRightsEnum } from '../../global/constants';

export default function authoriseAndOpen(
  caller,
  store,
  placesLoadedPromise,
  // router,
) {
  // Called from both mounted() and beforeUpdate() to:
  //   check whether the current user can do everything in the URL (now in vuex route store)
  //   move any valid aspects of the URL from here into the vuex validRoute store
  //   and then report any issues and/or move the data to the relevant bits of vuex and let the maps component open

  /* eslint-disable no-console, no-multiple-empty-lines, no-empty, no-unused-vars, max-len, padded-blocks */

  if (caller === 'Created') console.log('state when Created', store.state);
  store.dispatch('resetValidParams');

  // Find out about the current user and desired OPS
  const currentUser = store.state.users.account;
  const currentUserName = currentUser.user ? currentUser.user.username : 'Guest';
  const currentUserLoggedIn = currentUser.status.loggedIn;
  const currentOPSCode = store.getters.place.OPSCode;
  let desiredOPSCode = store.state.route.params.ops || initialOpsCode;

  // Check places is loaded then validate the OPS
  placesLoadedPromise.then(() => {
    const result = { errorsToReport: [], isOKToCarryOn: true };
    const place = store.getters.getPlaceFromPlaces(desiredOPSCode);
    if (!place) {
      result.errorsToReport.push(`${desiredOPSCode} is an Unknown study, so we show the default`);
      // Assume default is Unprotected
      desiredOPSCode = initialOpsCode;
      store.dispatch('setValidParam', { ops: desiredOPSCode });
      // Ignore all the other params - we will just have the defaults
      return result;
    }
    const usersBestRight = store.getters.bestRightForOPS(desiredOPSCode);
    console.log(`UBR for ${currentUserName} in ${desiredOPSCode} is ${usersBestRight}`);
    const placeIsProtected = place.Protected;
    if (placeIsProtected && (!currentUser.status.loggedIn || usersBestRight > userRightsEnum.opsViewer)) {
      result.errorsToReport.push(`${desiredOPSCode} is protected and you do not have the required rights`);
      result.isOKToCarryOn = false;
      return result;
    }
    // Here we know we want a valid study that we are allowed to see
    store.dispatch('setValidParam', { ops: desiredOPSCode });
    store.dispatch('setForUser', { username: currentUserName, ubr: usersBestRight });

    // Validate the layers

    // We are done validating
    return result;
  }).then((result) => {
    if (result.errorsToReport.length) {
      console.log('Errors', result.errorsToReport);
    }

    if (!result.isOKToCarryOn) {
      console.log('Not OKToCarryOn');
      // eslint-disable-next-line no-alert
      alert('Not OKToCarryOn');
      // router.go(-1);
    } else {
      console.log('OK ToCarryOn');
      // We are OK to go on - move the data to the relevant bits of vuex so this component can mount
      if (!currentOPSCode || (currentOPSCode !== desiredOPSCode)) {
        const loadingId = 'place';
        store.dispatch('startLoading', loadingId);
        store.dispatch(actions.request, {
          baseURL: process.env.VUE_APP_BACKEND_URL,
          url: `places/${desiredOPSCode}`,
          keyPath: ['place'],
        })
          .then(() => {
          // The state has been updated and you can do whatever you want with it
          // eslint-disable-next-line
          store.dispatch('initialiseChosenLayers', desiredOPSCode);
          })
          .then(() => {
            store.dispatch('updateView', store.getters.homeView);
          })
          .then(() => {
            store.dispatch('updateCurrentOptionArray', store.getters.getOptionsArrayByPlace(desiredOPSCode));
          })
          .then(() => {
            store.dispatch('endLoading', loadingId);
          });
      }
    }
  }).catch(err => console.log('Catch', err));


  /* eslint-enable no-console, no-multiple-empty-lines, no-empty, no-unused-vars, max-len */
}
