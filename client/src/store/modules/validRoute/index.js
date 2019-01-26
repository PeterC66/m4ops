import {
  RESET_VALID_PARAMS,
  SET_VALID_PARAM,
  SET_VALID_QUERY_PARAM,
} from '../../mutation-types';

const state = {
  params: {},
  query: {},
};

const mutations = {
  [RESET_VALID_PARAMS](moduleState) {
    moduleState.params = {};
    moduleState.query = {};
  },
  [SET_VALID_PARAM](moduleState, payload) {
    moduleState.params = { ...moduleState.params, ...payload };
  },
  [SET_VALID_QUERY_PARAM](moduleState, payload) {
    moduleState.query = { ...moduleState.query, ...payload };
  },
};

const actions = {
  resetValidParams({ commit }) {
    commit(RESET_VALID_PARAMS);
  },
  setValidParam({ commit }, param) {
    commit(SET_VALID_PARAM, { param });
  },
  setValidQueryParam({ commit }, param) {
    commit(SET_VALID_QUERY_PARAM, { param });
  },
};

const getters = {
};

const validRouteModule = {
  state,
  mutations,
  actions,
  getters,
};

export default validRouteModule;
