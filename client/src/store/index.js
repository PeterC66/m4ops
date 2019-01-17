import Vue from 'vue';
import Vuex from 'vuex';
import vuexApi from 'vuex-api';

import plugins from './plugins';
import geography from './modules/geography';
import mapping from './modules/mapping';
import vuexApiGetters from './modules/vuexApi/vuexApiGetters';
import framework from './modules/framework';
import demo from './modules/demo';
import { alert } from '../modules/users/_store/alert.module';
import { account } from '../modules/users/_store/account.module';
import { users } from '../modules/users/_store/users.module';

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
    alert,
    account,
    users,
  },
});
