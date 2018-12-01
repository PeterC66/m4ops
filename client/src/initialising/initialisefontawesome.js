import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Ensure icons are all imported here, and added to the library below
import {
  faAngleDoubleUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faBookOpen,
  faCaretUp,
  faChevronCircleDown,
  faChevronCircleUp,
  faEnvelope,
  faHome,
  faQuestionCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'; // fas
import {
  faEnvelope as faEnvelopeRegular,
  faClone,
}
  from '@fortawesome/free-regular-svg-icons'; // far
// See also free-brands-svg-icons fab

export default function initialiseFontAwesome(Vue) {
// See import above
  library.add(
    faAngleDoubleUp,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faBookOpen,
    faCaretUp,
    faChevronCircleDown,
    faChevronCircleUp,
    faEnvelope,
    faHome,
    faQuestionCircle,
    faSearch,
  );
  library.add(
    faEnvelopeRegular,
    faClone,
  );

  Vue.component('font-awesome-icon', FontAwesomeIcon); // Not Vue.use(plugin)
}
