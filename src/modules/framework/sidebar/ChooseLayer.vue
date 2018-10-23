<template>
  <div class="block">
    <el-cascader
      :options="layerOptions"
      :show-all-levels="false"
      v-model="selectedOption"
      expand-trigger="hover"
      @change="handleChange(selectedOption)"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ldidToCategoryAndLayer } from '../../../store/modules/vuexApi/categoriesAndLayers'; // eslint-disable-line max-len

export default {
  name: 'ChooseLayer',
  props: {
    ldid: {
      type: String,
      default: 'void',
    },
    layerNumber: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // selectedOption: ['Basic', 'World>Basic>OpenStreetMap'],
      selectedOption: ldidToCategoryAndLayer(this.ldid),
    };
  },
  computed: {
    ...mapGetters([
      'layerOptions',
    ]),
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style>

</style>

<!--

function displayRender(label) {
  return (label.join(' / '));
}
function ldidToCategoryAndLayer(ldid) {
  if (!ldid) return [];
  const idArray = ldid.split('>');
  return [idArray[1].replace('_', ' '), ldid];
}

export default function ChooseLayer(props) {
  const { options, onSelectLayer, ldid } = props;
  const onChange = (value) => {
    onSelectLayer(value[value.length - 1]);
  };

  const defaultOption = calcDefaultOption(ldid);

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
  ldid: string.isRequired,
};
-->
