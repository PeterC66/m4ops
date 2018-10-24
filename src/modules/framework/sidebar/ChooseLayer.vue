<template>
  <div class="block">
    <el-cascader
      :options="layerOptions"
      :show-all-levels="false"
      v-model="selectedOption"
      :clearable="true"
      expand-trigger="hover"
      @change="handleLdidChange"
      @blur="handleBlur"
    />
    <el-tooltip
      class="item"
      effect="light"
      content="Opacity"
      placement="top"
    >
      <div style="position:relative; width: 80%; left:10%">
        <el-slider
          v-if="showSlider"
          v-model="sliderValue"
          :show-tooltip="false"
          @change="handleOpacityChange"
        />
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
    layer: {
      type: Object,
      default: () => ({ ldid: voidLdid, opacity: 0.5 }),
    },
    layerNumber: {
      type: Number,
      required: true,
    },
    startingOpacityPc: { // out of 100 - divide by 100 to use, as intgers only
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
      selectedOption: ldidToCategoryAndLayer(this.layer.ldid),
      sliderValue: this.layer.opacity * 100, // value is opacity per cent
    };
  },
  computed: {
    ...mapGetters([
      'layerOptions',
    ]),
  },
  methods: {
    handleLdidChange(value) {
      // value is array of length 2, or or length 0 if chosen layer is deleted
      console.log('hLCh', this.layerNumber, value);
      this.$store.dispatch('setLayer', {
        ldid: value[1],
        layerNumber: this.layerNumber,
      });
    },
    handleOpacityChange(value) {
      // value is opacity per cent
      console.log('hOCh', this.layerNumber, value);
      this.$store.dispatch('setOpacity', {
        opacity: value / 100,
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
