<template>
  <!--
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
      <Tooltip placement="right" title="Select from the dropdown
          to choose a One-Place Study by Continent/Country/Location">
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
-->

  <div class="block">
    <el-cascader
      :options="options"
      :show-all-levels="false"
      v-model="selectedOptions"
      expand-trigger="hover"
      @change="handleChange"/>
  </div>

</template>

<script>
export default {
  name: 'ChooseOPS',
  data() {
    return {
      options: [{
        value: 'guide',
        label: 'Guide',
        children: [{
          value: 'disciplines',
          label: 'Disciplines',
          children: [{
            value: 'consistency',
            label: 'Consistency',
          }, {
            value: 'feedback',
            label: 'Feedback',
          }, {
            value: 'efficiency',
            label: 'Efficiency',
          }, {
            value: 'controllability',
            label: 'Controllability',
          }],
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'side nav',
            label: 'Side Navigation',
          }, {
            value: 'top nav',
            label: 'Top Navigation',
          }],
        }],
      }, {
        value: 'component',
        label: 'Component',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout',
          }, {
            value: 'color',
            label: 'Color',
          }, {
            value: 'typography',
            label: 'Typography',
          }, {
            value: 'icon',
            label: 'Icon',
          }, {
            value: 'button',
            label: 'Button',
          }],
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio',
          }, {
            value: 'checkbox',
            label: 'Checkbox',
          }, {
            value: 'input',
            label: 'Input',
          }, {
            value: 'input-number',
            label: 'InputNumber',
          }, {
            value: 'select',
            label: 'Select',
          }, {
            value: 'cascader',
            label: 'Cascader',
          }, {
            value: 'switch',
            label: 'Switch',
          }, {
            value: 'slider',
            label: 'Slider',
          }, {
            value: 'time-picker',
            label: 'TimePicker',
          }, {
            value: 'date-picker',
            label: 'DatePicker',
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          }, {
            value: 'upload',
            label: 'Upload',
          }, {
            value: 'rate',
            label: 'Rate',
          }, {
            value: 'form',
            label: 'Form',
          }],
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table',
          }, {
            value: 'tag',
            label: 'Tag',
          }, {
            value: 'progress',
            label: 'Progress',
          }, {
            value: 'tree',
            label: 'Tree',
          }, {
            value: 'pagination',
            label: 'Pagination',
          }, {
            value: 'badge',
            label: 'Badge',
          }],
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert',
          }, {
            value: 'loading',
            label: 'Loading',
          }, {
            value: 'message',
            label: 'Message',
          }, {
            value: 'message-box',
            label: 'MessageBox',
          }, {
            value: 'notification',
            label: 'Notification',
          }],
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu',
          }, {
            value: 'tabs',
            label: 'Tabs',
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          }, {
            value: 'dropdown',
            label: 'Dropdown',
          }, {
            value: 'steps',
            label: 'Steps',
          }],
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog',
          }, {
            value: 'tooltip',
            label: 'Tooltip',
          }, {
            value: 'popover',
            label: 'Popover',
          }, {
            value: 'card',
            label: 'Card',
          }, {
            value: 'carousel',
            label: 'Carousel',
          }, {
            value: 'collapse',
            label: 'Collapse',
          }],
        }],
      }, {
        value: 'resource',
        label: 'Resource',
        children: [{
          value: 'axure',
          label: 'Axure Components',
        }, {
          value: 'sketch',
          label: 'Sketch Templates',
        }, {
          value: 'docs',
          label: 'Design Documentation',
        }],
      }],
      selectedOptions: [],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>

</style>
