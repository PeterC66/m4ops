import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Ensure icons are all imported here, and added to the library below
import {
  faAngleDoubleUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// See also free-brands-svg-icons

export default function initialiseFontAwesome(Vue) {
// See import above
  library.add(
    faAngleDoubleUp,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faHome,
  );
  library.add(faEnvelope);

  Vue.component('font-awesome-icon', FontAwesomeIcon); // Not Vue.use(plugin)
}
