import React from 'react';
import { SimpleButton } from '@terrestris/react-geo';
import { Input, Tooltip } from 'antd';

import './Header.css';

const { Search } = Input;

const tellMe = () => (
  console.log('Clicked') // eslint-disable-line no-console
);

const HeaderR2 = () => (
  <div id="buttonsR2">
    <Tooltip title="Text to be searched for within open features, or coordinates to go to (any format).  If blank will ask.">
      <Search
        id="textForSearchOrCoords"
        placeholder="Text or Coords"
        size="small"
        style={{ width: '80%' }}
        onSearch={value => console.log(value)} // eslint-disable-line no-console
        enterButton
      />
    </Tooltip>
    <SimpleButton
      tooltip="Make the current view of M4OPS available as a URL to copy"
      tooltipPlacement="leftBottom"
      icon="copy"
      size="small"
      onClick={tellMe}
    />
  </div>
);

export default HeaderR2;
