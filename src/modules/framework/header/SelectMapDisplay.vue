<template>
  <el-select
    v-model="value"
    size="small"
    placeholder="Select Map Display"
    automatic-dropdown
    @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"/>
  </el-select>
</template>

<script>
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
    handleChange() {
      console.log('handleChange');
    },
  },
};
</script>
