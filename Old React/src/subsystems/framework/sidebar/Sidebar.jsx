import React, { Fragment } from 'react';
import { Tooltip, Tabs } from 'antd';

import {
  ToggleButton,
  mappify,
} from '@terrestris/react-geo';

import './Sidebar.css';

import LayersContainer from '../../geography/layerchoice/LayersContainer';

const MappifiedLayersContainer = mappify(LayersContainer);

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Sidebar = () => (
  <Fragment>
    <Tooltip placement="right" title="Toggle on or off the sidebar">
      <ToggleButton
        id="sidebartoggle"
        icon="arrow-left"
        pressedIcon="arrow-right"
        size="small"
        onToggle={() => {}} /* TODO */
      />
    </Tooltip>

    <MappifiedLayersContainer />

    <Tabs defaultActiveKey="Actions" type="card" onChange={callback}>
      <TabPane tab="Actions" key="Actions">Content of Actions Tab Pane</TabPane>
      <TabPane tab="MFL" key="MFL">Content of MFL Tab Pane</TabPane>
      <TabPane tab="Upload" key="Upload">Content of Upload Tab Pane</TabPane>
      <TabPane tab="Time" key="Time">Content of Time Tab Pane</TabPane>
    </Tabs>

  </Fragment>
);

export default Sidebar;
