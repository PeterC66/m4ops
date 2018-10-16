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

export default function initialiseFontAwesome(Vue) {
// See import above
  library.add(
    faArrowDown,
    faArrowUp,
    faArrowLeft,
    faArrowRight,
    faAngleDoubleUp,
  );

  Vue.component('font-awesome-icon', FontAwesomeIcon); // Not Vue.use(plugin)
}
