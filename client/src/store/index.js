import Vue from 'vue';
import Vuex from 'vuex';
import vuexApi from 'vuex-api';
import _ from 'lodash';

import plugins from './plugins';
import geography from './modules/geography';
import mapping from './modules/mapping';
import vuexApiRoutines from './modules/vuexApi/vuexApiRoutines';
import framework from './modules/framework';
import demo from './modules/demo';
import users from './modules/users';
import forms from './modules/forms';

Vue.use(Vuex);

vuexApi.getters = vuexApiRoutines.getters; // as vuexApi has none itself
_.assign(vuexApi.mutations, vuexApiRoutines.mutations);
_.assign(vuexApi.actions, vuexApiRoutines.actions);

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
