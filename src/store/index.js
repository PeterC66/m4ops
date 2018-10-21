import Vue from 'vue';
import Vuex from 'vuex';
import vuexApi from 'vuex-api';

import geography from './modules/geography';
import mapping from './modules/mapping';
import vuexApiGetters from './modules/vuexApi/vuexApiGetters';

Vue.use(Vuex);

vuexApi.getters = vuexApiGetters;

export default new Vuex.Store({
  modules: {
    vuexApi,
    geography,
    mapping,
  },
});
