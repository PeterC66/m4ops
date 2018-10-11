import React from 'react';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import {
  SimpleButton,
  mappify,
} from '@terrestris/react-geo';

import GoHomeButton from '../../mapping/components/GoHomeButton';

import './Header.css';

const MappifiedGoHomeButton = mappify(GoHomeButton);

// opsdetails is an alias for place, OPSDetails was used in the original M4OPS

const tellMe = () => (
  console.log('tellMe')
);

const HeaderR1 = () => (
  <div id="buttonsR1">
    <SimpleButton
      tooltip="No props Home"
      tooltipPlacement="leftBottom"
      icon="comments"
      size="small"
      onClick={tellMe}
    />
    <MappifiedGoHomeButton
      tooltip="Return to the original One-Place Study location"
      tooltipPlacement="leftBottom"
      icon="home"
      size="small"
    />
    <SimpleButton
      tooltip="Contact the person responsible for this study"
      tooltipPlacement="leftBottom"
      icon="envelope"
      size="small"
      onClick={tellMe}
    />
    <SimpleButton
      tooltip="Provide feedback to the person responsible for M4OPS within the Society for One-Place Studies"
      tooltipPlacement="leftBottom"
      icon="comment"
      size="small"
      href="mailto:peter.cooper@one-place-studies.org?subject=M4OPS"
    />
    <SimpleButton
      tooltip="See the Help documentation"
      tooltipPlacement="leftBottom"
      icon="question-circle"
      size="small"
      onClick={tellMe}
    />
  </div>
);

export default HeaderR1;
