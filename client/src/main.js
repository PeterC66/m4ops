import Vue from 'vue';
import { ApiHandlerComponent } from 'vuex-api';

import globalPlugin1 from './global/plugins/globalPlugin1';

import initialiseFontAwesome from './initialising/initialisefontawesome';
import initialiseElementComponents from './initialising/initialiseElementComponents'; // eslint-disable-line max-len
import initialiseVueLayers from './initialising/initialiseVueLayers';
import initialiseWarnings from './initialising/initialiseWarnings';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './global/components/_global'; // globally registers any _base components

initialiseFontAwesome(Vue);
initialiseElementComponents(Vue);
initialiseVueLayers(Vue);
initialiseWarnings();

Vue.component(
  'json-api',
  ApiHandlerComponent({
    requestConfig: { baseURL: 'http://localhost:5000' },
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
