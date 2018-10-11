import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

import {
  MapComponent,
} from '@terrestris/react-geo';

// import { setupMap } from '..';

import './Map.css';

// See mapping/index.js to tie in
const layer = new OlLayerTile({
  source: new OlSourceOsm(),
});

const center = [788453.4890155146, 6573085.729161344];

// create a new instance of ol.map in ES6 syntax
const map = new OlMap({
  view: new OlView({
    center,
    zoom: 16,
  }),
  layers: [layer],
});

/* eslint-disable react/prefer-stateless-function */
class Map extends Component {
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(setupMap({ map }));
  }

  render() {
    return (
      <div className="map">
        <MapComponent
          map={map}
          mapDivId="map"
        />
      </div>
    );
  }
}

// const { func } = PropTypes;

Map.propTypes = {
  // dispatch: func.isRequired,
};

export default Map;
