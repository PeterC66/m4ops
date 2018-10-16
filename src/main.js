import Vue from 'vue';
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader


import initialiseFontAwesome from './initialising/initialiseFontAwesome';
import initialiseElementComponents from './initialising/initialiseElementComponents'; // eslint-disable-line max-len
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(VueLayers);


initialiseFontAwesome(Vue);
initialiseElementComponents(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
