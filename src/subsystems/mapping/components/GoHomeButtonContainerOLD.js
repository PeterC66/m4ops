
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  mappify,
} from '@terrestris/react-geo';

import GoHomeButton from './GoHomeButton';
import { getPlace } from '../../geography';

const MappifiedGoHomeButton = mappify(GoHomeButton);

// opsdetails is an alias for place, OPSDetails was used in the original M4OPS

const GoHomeButtonContainer = (props) => {
  const { place } = props;
  return (
    /* eslint-disable react/jsx-filename-extension */
    <MappifiedGoHomeButton OPSDetails={place} />
    /* eslint-enable react/jsx-filename-extension */
  );
};

GoHomeButtonContainer.defaultProps = { // Only shown if geography reducer does not fire
  place: { OPSCode: 'Unk', OPSName: 'Unknown' },
};

const { object } = PropTypes;

GoHomeButtonContainer.propTypes = {
  place: object, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  place: getPlace(state),
});

export default connect(mapStateToProps)(GoHomeButtonContainer);
