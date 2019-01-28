/*
import {
  RESET_VALID_PARAMS,
  SET_VALID_PARAM,
  SET_VALID_QUERY_PARAM,
  SET_FOR_USER,
} from '../../mutation-types';
import { userRightsEnum } from '../../../global/constants';

const state = {
  params: {},
  query: {},
  forUser: {
    username: '',
    ubr: userRightsEnum.none,
  },
};

const mutations = {
  [RESET_VALID_PARAMS](moduleState) {
    moduleState.params = {};
    moduleState.query = {};
  },
  [SET_VALID_PARAM](moduleState, payload) {
    const { param } = payload;
    moduleState.params = { ...moduleState.params, ...param };
  },
  [SET_VALID_QUERY_PARAM](moduleState, payload) {
    const { param } = payload;
    moduleState.query = { ...moduleState.query, ...param };
  },
  [SET_FOR_USER](moduleState, payload) {
    moduleState.forUser = { ...payload };
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
  setForUser({ commit }, param) {
    commit(SET_FOR_USER, { ...param });
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
*/
