import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  mappify,
} from '@terrestris/react-geo';

import M4OPSLayout from './M4OPSLayout';
import MainMap from '../../mapping/overall/MainMap';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { fetchM4OPSData, fetchPlace } from '../../geography';

const MappifiedMainMap = mappify(MainMap);

class M4OPSContainer extends Component {
  componentDidMount() {
    const { place, onSetUp, onSelectPlace } = this.props;
    onSetUp(); // fetchM4OPSData
    onSelectPlace(place.OPSCode);
  }

  render() {
    const { place } = this.props;
    return (
      /* eslint-disable react/jsx-filename-extension */
      <M4OPSLayout
        header={<Header OPSDetails={place} />}
        sidebar={<Sidebar OPSDetails={place} />}
        main={<MappifiedMainMap OPSDetails={place} />}
      />
      /* eslint-enable react/jsx-filename-extension */
    );
  }
}

M4OPSContainer.defaultProps = { // Only shown if geography reducer does not fire
  place: { OPSCode: 'Unk', OPSName: 'Unknown' },
};

const { object, func } = PropTypes;

M4OPSContainer.propTypes = {
  place: object, // eslint-disable-line react/forbid-prop-types
  onSelectPlace: func.isRequired,
  onSetUp: func.isRequired,
};

const mapStateToProps = state => ({
  place: state.geography.value.place,
});

const mapDispatchToProps = dispatch => (
  {
    onSelectPlace: (opscode) => {
      dispatch(fetchPlace(opscode));
    },
    onSetUp: () => {
      dispatch(fetchM4OPSData());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(M4OPSContainer);
