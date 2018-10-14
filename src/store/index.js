import Vue from 'vue';
import Vuex from 'vuex';
import geography from './modules/geography';
import mapping from './modules/mapping';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    geography,
    mapping,
  },
});
