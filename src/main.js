import Vue from 'vue';
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader

// Ensure Element components are all imported here, and 'used' below
import {
  Aside,
  Button,
  Container,
  Header,
  Main,
  Select,
} from 'element-ui';

import initialiseFontAwesome from './initialising/initialisefontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(VueLayers);

// See import above
Vue.use(Aside);
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Select);

initialiseFontAwesome(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
