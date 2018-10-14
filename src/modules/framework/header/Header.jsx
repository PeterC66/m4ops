import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import HeaderTitles from './HeaderTitles';
import HeaderR1 from './HeaderR1';
import HeaderR2 from './HeaderR2';
import HeaderL1 from './HeaderL1';
import HeaderL2 from './HeaderL2';

export default function Header(props) {
  const { OPSDetails } = props;
  return (
    <Fragment>
      <HeaderTitles OPSDetails={OPSDetails} />
      <HeaderL1 OPSDetails={OPSDetails} />
      <HeaderL2 />
      <HeaderR1 />
      <HeaderR2 />
    </Fragment>
  );
}

const { object } = PropTypes;

Header.propTypes = {
  OPSDetails: object.isRequired, // eslint-disable-line react/forbid-prop-types
};
