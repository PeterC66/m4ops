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
    <el-tooltip
      class="item"
      effect="light"
      content="Opacity"
      placement="top">
      <div style="position:relative; width: 80%; left:10%">
        <el-slider
          v-if="showSlider"
          v-model="sliderValue"
          :show-tooltip="false"/>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ldidToCategoryAndLayer } from '../../../store/modules/vuexApi/categoriesAndLayers'; // eslint-disable-line max-len
import { voidLdid } from '../../../global/constants';

export default {
  name: 'ChooseLayer',
  props: {
    ldid: {
      type: String,
      default: voidLdid,
    },
    layerNumber: {
      type: Number,
      required: true,
    },
    startingOpacity: { // out of 100 - divide by 100 to use
      type: Number,
      default: 50,
    },
    showSlider: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // default value
      selectedOption: ldidToCategoryAndLayer(this.ldid),
      sliderValue: this.startingOpacity,
    };
  },
  computed: {
    ...mapGetters([
      'layerOptions',
    ]),
  },
  methods: {
    handleChange(value) {
      // value is array of length 2, or or length 0 if chosen layer is deleted
      console.log('hCh', this.layerNumber, value);
      this.$store.dispatch('setLayer', {
        ldid: value[1],
        layerNumber: this.layerNumber,
      });
    },
    handleBlur(event) { // eslint-disable-line no-unused-vars
      // Just testing
      // console.log('hB', this.layerNumber, event);
    },
  },
};
</script>

<style scoped>
  .el-slider__runway {
    width: 200px;
    margin: 0;
  }
</style>
