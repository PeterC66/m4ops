import Vue from 'vue';
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

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './plugins/element.js';

// See imports above
library.add(
  faArrowDown,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faAngleDoubleUp,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
