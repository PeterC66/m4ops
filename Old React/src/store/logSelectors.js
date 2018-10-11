/**
|--------------------------------------------------
| Based on logger from https://redux.js.org/advanced/middleware
| To use put the name of the selector into both the import and the array
|--------------------------------------------------
*/
import {
} from '../subsystems/geography';

const selectors = [
];


/* eslint-disable no-console */
const logSelectors = store => next => (action) => {
  const result = next(action);
  if (selectors.length > 0) {
    console.log('%cSelectors', 'font-weight: bold; text-decoration: underline');
  }
  selectors.map(selector => console.log(`${selector.reportingName}=`, selector(store.getState())));
  return result;
};

export default logSelectors;
