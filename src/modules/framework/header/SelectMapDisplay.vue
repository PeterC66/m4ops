<template>
  <el-select
    v-model="value"
    size="small"
    placeholder="Select Map Display"
    automatic-dropdown
    @change="updateMapDisplay(value)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"/>
  </el-select>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SelectMapDisplay',
  data() {
    return {
      options: [{
        value: 'overlay',
        label: 'Overlay',
      }, {
        value: 'side-by-side',
        label: 'Side by Side',
      }, {
        value: 'spyglass',
        label: 'Spyglass',
      }],
      value: 'overlay',
    };
  },
  methods: {
    ...mapActions([
      'updateMapDisplay',
    ]),
  },
};
</script>

<style>
  /* min-width: 203px;?? */
</style>
