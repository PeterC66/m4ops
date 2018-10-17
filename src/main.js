import Vue from 'vue';

import initialiseFontAwesome from './initialising/initialiseFontAwesome';
import initialiseElementComponents from './initialising/initialiseElementComponents'; // eslint-disable-line max-len
import initialiseVueLayers from './initialising/initialiseVueLayers';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

initialiseFontAwesome(Vue);
initialiseElementComponents(Vue);
initialiseVueLayers(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  strict: process.env.NODE_ENV !== 'production',
  render: h => h(App),
}).$mount('#app');
