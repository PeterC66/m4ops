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

<style>

</style>
