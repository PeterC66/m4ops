import React, { Fragment } from 'react';
import { SimpleButton } from '@terrestris/react-geo';
import { Tooltip } from 'antd';

import './HeaderTitles.css';

const tellMe = () => (
  console.log('Clicked') // eslint-disable-line no-console
);

export default function HeaderTitles(props) {
  const { OPSDetails } = props || { OPSDetails: { OPSCode: 'Unk', OPSName: 'Unknown' } };
  const placeName = `${OPSDetails.OPSCode} ${OPSDetails.OPSName}`;
  return (
    <Fragment>
      <div id="headertitle">
        <h1 id="mainhead">
          <Tooltip title="Open the forum for Mapping for One-Place Studies">
            M4OPS
            <a
              href="http://mapping4ops.org/"

              target="_blank"
              rel="noopener noreferrer"
            >
              : Mapping for One-Place Studies
            </a>
          </Tooltip>
        </h1>
      </div>
      <div id="headersubtitleblock">
        <SimpleButton
          id="DescribeOPS"
          tooltip="Click for details of this OPS"
          tooltipPlacement="bottom"
          onClick={tellMe}
          ghost
        >
          {`Maps for ${placeName}`}
        </SimpleButton>
      </div>

    </Fragment>
  );
}
