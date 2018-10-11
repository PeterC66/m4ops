import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LoremIpsum from '../../../global/components/LoremIpsum';

import 'ol/ol.css';
import 'antd/dist/antd.css';
import '../../../global/styles/react-geo.css';
import './M4OPSLayout.css';
import '../../../global/styles/App.css';

const M4OPSLayout = ({ header, sidebar, main }) => (
  <Fragment>
    <div id="header">
      {header}
    </div>

    <div id="sidebar">
      {sidebar}
    </div>

    <div id="maps">
      {main}
    </div>

  </Fragment>
);

M4OPSLayout.defaultProps = {
  header: <LoremIpsum />,
  sidebar: <LoremIpsum />,
  main: <LoremIpsum />,
};

const { object } = PropTypes;

M4OPSLayout.propTypes = {
  header: object, // eslint-disable-line react/forbid-prop-types
  sidebar: object, // eslint-disable-line react/forbid-prop-types
  main: object, // eslint-disable-line react/forbid-prop-types
};
export default M4OPSLayout;
