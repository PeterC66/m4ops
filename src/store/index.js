import Vue from 'vue';
import Vuex from 'vuex';
import vuexApi from 'vuex-api';

import pathify from '../global/plugins/pathify'; // from local version, originally from vuex-pathify

import geography from './modules/geography';
import mapping from './modules/mapping';
import vuexApiGetters from './modules/vuexApi/vuexApiGetters';

Vue.use(Vuex);

vuexApi.getters = vuexApiGetters;

export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules: {
    vuexApi,
    geography,
    mapping,
  },
});
