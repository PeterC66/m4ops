import React, { Fragment } from 'react';
import { Cascader, Tooltip } from 'antd';
import PropTypes from 'prop-types';

// Just show the last item.
function displayRender(label) {
  return label[label.length - 1];
}

export default function ChooseOPS(props) {
  const { onSelectPlace } = props;
  const onChange = (value) => {
    onSelectPlace(value[value.length - 1]);
    // TODO utilise this localStorage
    localStorage.setItem('chosenOPSCode', value[value.length - 1]);
  };

  const { continents } = props;
  const options = continents
    .filter(continent => (continent.M4OPS))
    .map(continent => (
      {
        value: continent.continent,
        label: continent.continent,
        children: continent.countryArray
          .filter(country => (country.M4OPS))
          .map(country => (
            {
              value: country.country,
              label: country.country,
              children: country.locationArray
                .filter(location => (location.M4OPS))
                .map(location => (
                  {
                    value: location.location,
                    label: location.location,
                    children: location.studyArray
                      .filter(study => (study.opsCode))
                      .map(study => (
                        {
                          value: study.opsCode,
                          label: `${study.opsCode} ${study.studyArea}`,
                          children: [],
                        }
                      )),
                  }
                )),
            }
          )),
      }
    ));

  return (
    <Fragment>
      <Tooltip placement="right" title="Select from the dropdown to choose a One-Place Study by Continent/Country/Location">
        <Cascader
          options={options}
          defaultValue={['Europe', 'England', 'Cambridgeshire', 'HcN']}
          expandTrigger="hover"
          displayRender={displayRender}
          onChange={onChange}
          size="small"
          style={{ width: 300 }}
        />
      </Tooltip>
    </Fragment>
  );
}


const { array, func } = PropTypes;

ChooseOPS.propTypes = {
  continents: array.isRequired, // eslint-disable-line react/forbid-prop-types
  onSelectPlace: func.isRequired,
};
