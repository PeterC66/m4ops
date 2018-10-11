import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import OlMap from 'ol/map';

import {
  MapComponent,
} from '@terrestris/react-geo';

import './Map.css';

class MainMap extends Component {
  constructor(props) {
    super(props);

    this.mapDivId = 'mapDivId';
  }

  componentDidMount() {
    console.log('MainMap props', this.props);
    const { map } = this.props;
    window.setTimeout(() => {
      map.setTarget(this.mapDivId);
    }, 100);
  }

  /* eslint-disable react/jsx-filename-extension */
  render() {
    const { map } = this.props;
    return (
      <Fragment>
        <MapComponent
          map={map}
          id={this.mapDivId}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Fragment>
    );
  }
  /* eslint-enable react/jsx-filename-extension */
}

// const { func } = PropTypes;

MainMap.propTypes = {
  map: PropTypes.instanceOf(OlMap).isRequired,
};

export default MainMap;
