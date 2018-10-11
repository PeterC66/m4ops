import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchContinents, fetchPlace } from '../../geography';
import ChooseOPS from './ChooseOPS';
/**
|--------------------------------------------------
| This special container is needed so we can connect to continents,
|  and dispatch the fetchPlace action
|--------------------------------------------------
*/
class ChooseOPSContainer extends Component {
  componentDidMount() {
    const { getContinents } = this.props;
    getContinents();
  }

  render() {
    const { continents, onSelectPlace } = this.props;
    return (
    /* eslint-disable react/jsx-filename-extension */
      <ChooseOPS
        continents={continents}
        onSelectPlace={onSelectPlace}
      />
    /* eslint-enable react/jsx-filename-extension */
    );
  }
}

ChooseOPSContainer.defaultProps = {
  continents: [{ continent: 'Unknown' }],
};

const { array, func } = PropTypes;

ChooseOPSContainer.propTypes = {
  getContinents: func.isRequired,
  onSelectPlace: func.isRequired,
  continents: array, // eslint-disable-line react/forbid-prop-types

};
/* eslint-enable react/forbid-prop-types */

// format is state.reducerName.collectionName
const mapStateToProps = state => ({
  continents: state.geography.value.continents,
  place: state.geography.value.place,
});

const mapDispatchToProps = dispatch => (
  {
    onSelectPlace: (opscode) => {
      dispatch(fetchPlace(opscode));
    },
    getContinents: () => {
      dispatch(fetchContinents());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ChooseOPSContainer);
