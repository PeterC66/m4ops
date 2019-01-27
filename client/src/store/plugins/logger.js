import _ from 'lodash';
import createLogger from 'vuex/dist/logger';

import { UPDATE_VIEW, OPACITY_SET_REQUEST } from '../mutation-types';

const ignoreMutations = [
  UPDATE_VIEW,
  OPACITY_SET_REQUEST,
];

// For options see https://vuex.vuejs.org/guide/plugins.html#built-in-logger-plugin
const logger = createLogger({
  // collapsed
  filter(mutation) { // could also have stateBefore, stateAfter
    // returns `true` if a mutation should be logged
    // `mutation` is a `{ type, payload }`
    return !_.includes(ignoreMutations, mutation.type);
  },
  // transformer (state) {
  mutationTransformer(mutation) {
    // mutations are logged in the format of `{ type, payload }`
    // we can format it any way we want.
    const { type, payload } = mutation;
    let result = { type, payload };
    // eslint-disable-next-line max-len
    if (type.substr(-9) === '_Api_Call') result = { type, path: payload.keyPath[0] };
    return result;
  },
  // logger: console
});

export default logger;
