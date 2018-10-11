// From https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
// See this for further implementation and use

import reducerRegistry from '../../store/reducerRegistry';

// assign prefix
const reducerName = 'loading';

// REDUCERS

// (No error handling)
const reducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|RESPONSE)/.exec(type);

  // not a *_REQUEST / *_RESPONSE action, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    [requestName]: requestState === 'REQUEST',
  };
};

export default reducer;

// Register the reducer

reducerRegistry.register(reducerName, reducer);

// SELECTORS

export const getAllLoading = state => state[reducerName].value;
