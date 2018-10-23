<template>
  <div class="block">
    <el-cascader
      :options="layerOptions"
      :show-all-levels="false"
      v-model="selectedOption"
      :clearable="true"
      expand-trigger="hover"
      @change="handleChange"
      @blur="handleBlur"
    />
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
      // default value
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
      console.log('hCh', this.layerNumber, value);
    },
    handleBlur(event) { // eslint-disable-line no-unused-vars
      // Just testing
      // console.log('hB', this.layerNumber, event);
    },
  },
};
</script>

<style>

</style>
