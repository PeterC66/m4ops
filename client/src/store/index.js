import Vue from 'vue';
import Vuex from 'vuex';
import vuexApi from 'vuex-api';

import plugins from './plugins';
import geography from './modules/geography';
import mapping from './modules/mapping';
import vuexApiGetters from './modules/vuexApi/vuexApiGetters';
import framework from './modules/framework';
import demo from './modules/demo';
import users from './modules/users';
import forms from './modules/forms';

Vue.use(Vuex);

vuexApi.getters = vuexApiGetters;

export default new Vuex.Store({
  plugins,
  modules: {
    vuexApi,
    geography,
    mapping,
    framework,
    demo,
    users,
    forms,
  },
});
