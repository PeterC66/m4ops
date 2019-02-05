import _ from 'lodash';
import { NOPORTAL } from '../../../global/constants';

import {
  HIDE_PORTAL,
  SHOW_PORTAL,
} from '../../mutation-types';

const state = {
  portalName: '',
  title: NOPORTAL, // means do not show
  formId: '',
  actionTextsArray: [],
  ldid: '',
  messagesArray: [],
};

const mutations = {
  [HIDE_PORTAL](moduleState) {
    moduleState.title = NOPORTAL;
    moduleState.portalName = '';
    moduleState.actionTextsArray.length = 0;
    moduleState.messagesArray.length = 0;
    moduleState.formId = '';
    moduleState.ldid = '';
  },
  [SHOW_PORTAL](moduleState, payload) {
    moduleState.portalName = payload.portalName;
    moduleState.formId = payload.formId || '';
    moduleState.ldid = payload.ldid || '';
    moduleState.actionTextsArray = _.isEmpty(payload.actionTextsArray)
      ? []
      : payload.actionTextsArray.slice();
    moduleState.messagesArray = _.isEmpty(payload.messagesArray)
      ? []
      : payload.messagesArray.slice();
    moduleState.title = payload.title;
  },
};

const actions = {
  hidePortal({ commit }) {
    commit(HIDE_PORTAL);
  },
  showPortal({ commit }, {
    portalName,
    title,
    formId,
    actionTextsArray,
    ldid,
    messagesArray,
  }) {
    commit(SHOW_PORTAL, {
      portalName,
      title,
      formId,
      actionTextsArray,
      ldid,
      messagesArray,
    });
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
