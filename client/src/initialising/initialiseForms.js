// Ensure Form components are all imported here, and 'used' below
import Modal2WithPortal from '../modules/forms/Modal2WithPortal.vue';

// Do not try to use an enum for these forms, just use the name throughout

export default function initialiseForms(Vue) {
// See import above
  Vue.component(Modal2WithPortal.name, Modal2WithPortal);
}
