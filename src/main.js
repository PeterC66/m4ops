import Vue from 'vue';
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Ensure icons are all imported here, and added to the library below
import {
  faArrowDown,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
// Note that there are problems using icons from free-regular-svg-icons and free-brands-svg-icons

// Ensure Element components are all imported here, and 'used' below
import {
  Aside,
  Button,
  Container,
  Header,
  Main,
  Select,
} from 'element-ui';

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

// See import above
library.add(
  faArrowDown,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faAngleDoubleUp,
);

Vue.component('font-awesome-icon', FontAwesomeIcon); // Not Vue.use

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
