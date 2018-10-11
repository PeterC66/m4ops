import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import MapsContext from './subsystems/mapping/overall/MapsContext';

/* // Null State - then initialised within reducers (with their actions)
const nullState = {
  geography: {
    value: {
      place: { OPSCode: 'Unk', OPSName: 'Unknown' },
      continents: [],
    },
  },
}; */

export const store = configureStore();

const App = () => (
  /* eslint-disable react/jsx-filename-extension */
  <Provider store={store}>
    <MapsContext />
  </Provider>
  /* eslint-enable react/jsx-filename-extension */
);

export default App;
