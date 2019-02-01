// Ensure Form components are all imported here, and 'used' below
import ModalOuter from '../modules/forms/ModalOuter.vue';

// Do not try to use an enum for these forms, just use the name throughout

export default function initialiseForms(Vue) {
  Vue.component(ModalOuter.name, ModalOuter);
}
