import Vue from 'vue';
import { ApiHandlerComponent } from 'vuex-api';
import Buefy from 'buefy';
// import 'buefy/dist/buefy.css';
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader
import 'vue-form-generator/dist/vfg.css';
import './global/styles/vfgModifications.css';

import globalPlugin1 from './global/plugins/globalPlugin1';

import initialiseFontAwesome from './initialising/initialisefontawesome';
import initialiseElementComponents from './initialising/initialiseElementComponents'; // eslint-disable-line max-len
// import initialiseVueLayers from './initialising/initialiseVueLayers';
import initialiseWarnings from './initialising/initialiseWarnings';

// import App from './App.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './global/components/_global'; // globally registers any _base components

// setup fake backend - comment out this section to use the real backend/server/api
// eslint-disable-next-line import/no-duplicates
import { configureFakeBackend } from './modules/users/_helpers';

configureFakeBackend();
// End of setup fake backend

// console.log('env', process.env);

Vue.use(VueLayers);

initialiseFontAwesome(Vue);
initialiseElementComponents(Vue);
// initialiseVueLayers(Vue);
initialiseWarnings();

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultTooltipType: 'is-info',
  // defaultContainerElement: '#content',
  // ...
});

Vue.component(
  'json-api',
  ApiHandlerComponent({
    // requestConfig: { baseURL: 'http://localhost:5000' },
    requestConfig: { baseURL: process.env.VUE_APP_BACKEND_URL },
  }),
);

Vue.use(globalPlugin1, { anOption: true });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  strict: process.env.NODE_ENV !== 'production',
  render: h => h(App),
}).$mount('#app');
