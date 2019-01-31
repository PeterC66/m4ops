import Vue from 'vue';
import { ApiHandlerComponent, actions } from 'vuex-api';
import { sync } from 'vuex-router-sync';
import Buefy from 'buefy';
// import 'buefy/dist/buefy.css';
import PortalVue from 'portal-vue';
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader
import 'vue-form-generator/dist/vfg.css';
import './global/styles/vfgModifications.css';

import globalPlugin1 from './global/plugins/globalPlugin1';

import initialiseFontAwesome from './initialising/initialisefontawesome';
import initialiseElementComponents from './initialising/initialiseElementComponents'; // eslint-disable-line max-len
// import initialiseVueLayers from './initialising/initialiseVueLayers';
import initialiseWarnings from './initialising/initialiseWarnings';
import initialiseForms from './initialising/initialiseForms';

// import App from './App.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './global/components/_global'; // globally registers any _base components

/*
// setup fake backend - comment out this section to use the real backend/server/api
// eslint-disable-next-line import/no-duplicates
import { configureFakeBackend } from './modules/users/_helpers';

configureFakeBackend();
// End of setup fake backend
*/

// console.log('env', process.env);

Vue.use(PortalVue);
Vue.use(VueLayers);

// eslint-disable-next-line no-unused-vars
const unsync = sync(store, router, { moduleName: 'route' }); // returns an unsync callback fn
// if you want to release/destroy Vue components/resources) use unsync()

initialiseFontAwesome(Vue);
initialiseElementComponents(Vue);
// initialiseVueLayers(Vue); // NOt needed as we Vue.use(VueLayers); above
initialiseWarnings();
initialiseForms(Vue);

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultTooltipType: 'is-info',
  // defaultContainerElement: '#content',
  // ...
});

Vue.component(
  'json-api',
  ApiHandlerComponent({
    requestConfig: { baseURL: process.env.VUE_APP_BACKEND_URL },
  }),
);

Vue.use(globalPlugin1, { anOption: true });

Vue.config.productionTip = false;

// dispatch the initial loads (asynchronous), committing to store
Promise.all([
  store.dispatch(actions.request, {
    baseURL: process.env.VUE_APP_BACKEND_URL,
    url: 'continents',
    keyPath: ['continents'],
  }),
  store.dispatch(actions.request, {
    baseURL: process.env.VUE_APP_BACKEND_URL,
    url: 'm4opsdata',
    keyPath: ['m4opsdata'],
  }),
  store.dispatch(actions.request, {
    baseURL: process.env.VUE_APP_BACKEND_URL,
    url: 'places',
    keyPath: ['places'],
  }),
  store.dispatch('getAllUsers'),
]).then(() => {
  // create the main Vue instance and mount it
  new Vue({
    router,
    store,
    strict: process.env.NODE_ENV !== 'production',
    render: h => h(App),
  }).$mount('#app');
});
