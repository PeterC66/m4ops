import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import onStateChange from 'redux-on-state-change';

import logger from 'redux-logger';
import reducerRegistry from './reducerRegistry';
import stateChangeActions from '../subsystems/stateChangeActions';
import logSelectors from './logSelectors';
import combinedReducer from './combinedReducer';

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunk, logSelectors, logger];

  const middlewareEnhancer = applyMiddleware(...middlewares, onStateChange(stateChangeActions));

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = compose(...storeEnhancers);

  // Preserve initial state for not-yet-loaded reducers
  const combine = (reducers) => {
    const reducerNames = Object.keys(reducers);
    Object.keys(preloadedState).forEach((item) => {
      if (reducerNames.indexOf(item) === -1) {
        reducers[item] = (state = null) => state; // eslint-disable-line no-param-reassign
      }
    });
    return combinedReducer(reducers);
  };

  const reducer = combine(reducerRegistry.getReducers());
  const store = createStore(reducer, preloadedState, composedEnhancer);

  // Replace the store's reducer whenever a new reducer is registered.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(combine(reducers));
  });

  return store;
}
