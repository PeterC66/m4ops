import React from 'react';
import { SimpleButton } from '@terrestris/react-geo';
import { Popover } from 'antd';

import ChooseOPSContainer from './ChooseOPSContainer';
import './Header.css';

export default function HeaderL1() {
  return (
    <div id="OPSSelect">
      <Popover content={<ChooseOPSContainer />} title="Choose OPS" trigger="click" placement="bottomRight">
        <SimpleButton
          tooltip="Open the cascaded dropdown to choose a One-Place Study"
          tooltipPlacement="right"
          icon="chevron-circle-down"
          size="small"
        />
      </Popover>
    </div>
  );
}
