import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChooseLayer from './ChooseLayer';
import { getCategoriesAndLayers } from '..';
import { setLayerRequest } from '../../mapping/index';

class ChooseLayerContainer extends Component {
  componentDidMount() {
  }

  render() {
    const { options, onSelectLayer, ldId } = this.props;
    return (
    /* eslint-disable react/jsx-filename-extension */
      <ChooseLayer
        options={options}
        onSelectLayer={onSelectLayer}
        ldId={ldId}
      />
    /* eslint-enable react/jsx-filename-extension */
    );
  }
}

ChooseLayerContainer.defaultProps = {
  ldId: '',
};

const { array, func, string } = PropTypes;

ChooseLayerContainer.propTypes = {
  options: array.isRequired, // eslint-disable-line react/forbid-prop-types
  onSelectLayer: func.isRequired,
  ldId: string,
};

// format is state.reducerName.collectionName
const mapStateToProps = state => ({
  options: getCategoriesAndLayers(state),
});

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onSelectLayer: (ldId) => {
      dispatch(setLayerRequest({
        ldId,
        layerNumber: ownProps.layerNumber,
      }));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLayerContainer);
