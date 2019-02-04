// import _ from 'lodash';
import { NOPORTAL } from '../../../global/constants';

import {
  HIDE_PORTAL,
  SHOW_PORTAL,
} from '../../mutation-types';

const state = {
  title: NOPORTAL, // means do not show
  formId: '',
};

const mutations = {
  [HIDE_PORTAL](moduleState) {
    moduleState.title = NOPORTAL;
    moduleState.formId = '';
  },
  [SHOW_PORTAL](moduleState, payload) {
    moduleState.formId = payload.formId;
    moduleState.title = payload.title;
  },
};

const actions = {
  hidePortal({ commit }) {
    commit(HIDE_PORTAL);
  },
  showPortal({ commit }, { title, formId }) {
    commit(SHOW_PORTAL, { title, formId });
  },
};

const getters = {
  thisFormSpec(
    moduleState,
    moduleGetters,
    rootState,
    rootGetters,
  ) {
    return rootGetters.getFormById(moduleState.formId);
  },
};

const formsModule = {
  state,
  mutations,
  actions,
  getters,
};

export default formsModule;
