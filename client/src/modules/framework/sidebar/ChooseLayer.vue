<template>
  <div>
    <!-- Keep using el-cascader -->
    <el-cascader
      :options="layerOptions"
      :show-all-levels="false"
      v-model="selectedOption"
      :clearable="layerNumber > 0"
      expand-trigger="hover"
      @change="handleLdidChange"
      @blur="handleBlur"
    />
    <b-tooltip
      label="Move up"
      position="is-right"
    >
      <button
        v-if="showUpButton"
        style="color: lightgreen; text-decoration: none;"
        class="button is-small is-text has-text-centered"
        @click="moveUp()">
        <font-awesome-icon icon="arrow-up" />
      </button>
    </b-tooltip>
    <div style="position:relative; width: 80%; left:10%">
      <vue-slider
        v-if="showSlider"
        ref="slider"
        v-model="sliderValue"
        v-bind="sliderOptions"
        @change="handleOpacityChange"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import vueSlider from 'vue-slider-component';

import { ldidToCategoryAndLayer } from '../../../store/modules/vuexApi/categoriesAndLayers'; // eslint-disable-line max-len
import { newVoid } from '../../../global/utils';
import { displayTypeEnum } from '../../../global/constants';

export default {
  name: 'ChooseLayer',
  components: {
    vueSlider,
  },
  props: {
    layer: {
      type: Object,
      default: () => ({ ldid: newVoid(), opacity: 0.5 }),
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
    showUpButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // default value
      selectedOption: ldidToCategoryAndLayer(this.layer.ldid),

      sliderValue: this.layer.opacity * 100, // value is opacity per cent
      sliderOptions: {
        eventType: 'auto',
        width: 'auto',
        height: 4,
        dotSize: 6,
        min: 0,
        max: 100,
        interval: 1,
        show: true,
        speed: 1,
        tooltip: 'hover',
        formatter: v => `Opacity ${v}%`,
      },
    };
  },
  computed: {
    ...mapGetters([
      'layerOptions',
    ]),
  },
  watch: {
    sliderValue(value) {
      if (value !== this.layer.opacity * 100) {
        this.handleOpacityChange(value);
      }
    },
  },
  methods: {
    handleLdidChange(value) {
      // value is array of length 2 (category, ldid), or of length 0 if chosen layer is deleted
      const ldid = value[1];
      let displaytype = displayTypeEnum.mostlyRasters; // default
      if (ldid) {
        const ld = this.$store.getters.getOPSAllLayerDefsArrayByLdid(ldid);
        if (ld) {
          displaytype = ld.displaytype || displayTypeEnum.mostlyRasters;
        }
      }
      if (this.layerNumber < 0) {
        this.$store.dispatch('setRhLayer', { ldid });
      } else {
        this.$store.dispatch('setLayer', {
          ldid,
          layerNumber: this.layerNumber,
          displaytype,
        });
      }
    },
    handleOpacityChange(value) {
      // value is opacity per cent
      this.$store.dispatch('setOpacity', {
        opacity: value / 100,
        layerNumber: this.layerNumber,
      });
    },
    handleBlur(event) { // eslint-disable-line no-unused-vars
      // Just testing
      // console.log('hB', this.layerNumber, event);
    },
    moveUp() {
      this.$store.dispatch('moveLayerUp', { layerNumber: this.layerNumber });
    },
  },
};
</script>

<style>
/* .el-cascader {
    line-height: 20px;
    height: 20px;
} */
.el-input__inner {
    height: 30px;
    line-height: 20px;
    padding: 0 15px;
}
</style>
