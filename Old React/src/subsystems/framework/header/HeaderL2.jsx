import React from 'react';
import { Tooltip, Select } from 'antd';

import './Header.css';

const { Option } = Select;

function handleChange(value) {
  console.log(`Option chosen = ${value}`);
}

const HeaderL2 = () => (
  <div id="buttonsL">
    <Tooltip placement="right" title="Select from the dropdown to change whether the current display is one map with an overlay and opacity slider, side by side maps, or one map with a spyglass">
      <Select defaultValue="overlay" style={{ width: 120 }} onChange={handleChange} size="small">
        <Option value="overlay">Overlay</Option>
        <Option value="side by side">Side by Side</Option>
        <Option value="spyglass">Spyglass</Option>
      </Select>
    </Tooltip>

    <Tooltip placement="right" title="Select from the dropdown to change between Normal clicking (No lat/lon click), and getting lat/lon (in various formats)">
      <Select defaultValue="no" style={{ width: 170 }} onChange={handleChange} size="small">
        <Option value="no">No lat/lon click</Option>
        <Option value="m4opscsv">M4OPS lon;lat csv</Option>
        <Option value="m4opsparam">M4OPS parameters</Option>
        <Option value="csv">lat,lon csv</Option>
        <Option value="geojson">lon,lat GeoJSON</Option>
        <Option value="epsg3857">EPSG:3857 (x/y)</Option>
        <Option value="hdms">DegMinSec N/E</Option>
        <Option value="geohack">GeoHack links</Option>
      </Select>
    </Tooltip>
  </div>

);

export default HeaderL2;
