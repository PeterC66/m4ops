import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';

import {
  MapProvider,
} from '@terrestris/react-geo';

import M4OPSContainer from '../../framework/overall/M4OPSContainer';
import { ldIdOSM } from '../../../global/constants';

class MapsContext extends Component {
  constructor(props) {
    super(props);

    this.mapPromise = new Promise((resolve) => {
      const layer = new OlLayerTile({
        source: new OlSourceOsm(),
      });
      layer.set('ldId', ldIdOSM);
      layer.set('key', ldIdOSM);

      const map = new OlMap({
        target: null,
        view: new OlView({
          center: [
            0,
            52,
          ],
          projection: 'EPSG:4326',
          zoom: 14,
        }),
        layers: [layer],
      });

      this.map = map;

      resolve(map);
    });
  }

  /* eslint-disable react/jsx-filename-extension */
  render() {
    return (
      <MapProvider map={this.mapPromise}>
        <M4OPSContainer />
      </MapProvider>
    );
  }
  /* eslint-enable react/jsx-filename-extension */
}

export default MapsContext;
