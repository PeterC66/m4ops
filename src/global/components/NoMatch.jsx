import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-one-expression-per-line */
const NoMatch = ({ location }) => (
  <Fragment>
    <h3>No match for{' '}{location.pathname}</h3>
  </Fragment>
);
/* eslint-enable react/jsx-one-expression-per-line */

const {
  object,
} = PropTypes;

NoMatch.propTypes = {
  location: object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default NoMatch;
