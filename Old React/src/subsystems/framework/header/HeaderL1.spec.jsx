/* eslint-env jest */

import React from 'react';
import ReactDOM from 'react-dom';

import HeaderL1 from './HeaderL1';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderL1 />, div);
});
