import { getOPSAllLayerDefsArray } from '../subsystems/geography';

// Inspired by https://redux.js.org/recipes/structuringreducers/beyondcombinereducers
// Based on simple code from http://blog.jakoblind.no/code-your-own-combinereducers/
// used to give extra bits of state to slice reducers for certain actions

// In our case to give access to LayerDefs from geography to mapping
// combinedReducer replaces the Redux standard combineReducers

export default function combinedReducer(reducers) {
  // First get an array with all the keys of the reducers (the reducer names)
  const reducerKeys = Object.keys(reducers);

  return function combination(state = {}, action) {
    // This is the object we are going to return.
    const nextState = {};

    // Loop through all the reducer keys
    for (let i = 0; i < reducerKeys.length; i += 1) {
      // Get the current key name
      const key = reducerKeys[i];
      // Get the current reducer
      const reducer = reducers[key];
      // Get the the previous state
      const previousStateForKey = state[key];
      // Get the next state by running the reducer
      const nextStateForKey = (key === 'mapping')
        // add in the other data to the action
        ? reducer(previousStateForKey, { ...action, LayerDefs: getOPSAllLayerDefsArray(state) })
        : reducer(previousStateForKey, action);
      // Update the new state for the current reducer
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}
