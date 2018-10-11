import React, { Fragment } from 'react';
import { Cascader } from 'antd';
import PropTypes from 'prop-types';

function displayRender(label) {
  return (label.join(' / '));
}

function calcDefaultOption(ldId) {
  if (!ldId) return [];
  const idArray = ldId.split('>');
  return [idArray[1].replace('_', ' '), ldId];
}

export default function ChooseLayer(props) {
  const { options, onSelectLayer, ldId } = props;
  const onChange = (value) => {
    onSelectLayer(value[value.length - 1]);
  };

  const defaultOption = calcDefaultOption(ldId);

  return (
    <Fragment>
      <Cascader
        options={options}
        defaultValue={defaultOption}
        expandTrigger="hover"
        displayRender={displayRender}
        onChange={onChange}
        size="small"
        style={{ width: 300 }}
      />
    </Fragment>
  );
}


const { array, func, string } = PropTypes;

ChooseLayer.propTypes = {
  options: array.isRequired, // eslint-disable-line react/forbid-prop-types
  onSelectLayer: func.isRequired,
  ldId: string.isRequired,
};
