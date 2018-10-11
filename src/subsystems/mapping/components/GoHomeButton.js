// This assumes that it has been mappified before being called, so map is available as a prop
//  and is in a Container which does a connect to redux so opsdetails is available as another prop

import React, { Component } from 'react';
import {
  SimpleButton,
} from '@terrestris/react-geo';

import { returntohomeview } from '../utils/homeview';

// opsdetails is an alias for place, OPSDetails was used in the original M4OPS

class GoHomeButton extends Component {
  onClick = () => {
    const { map, opsdetails } = this.props;
    returntohomeview(map, opsdetails);
  };

  render() {
    const { dispatch, ...remaining } = this.props;
    return (
      /* eslint-disable react/jsx-filename-extension */
      <SimpleButton onClick={this.onClick} {...remaining} />
    /* eslint-enable react/jsx-filename-extension */
    );
  }
}

export default GoHomeButton;
