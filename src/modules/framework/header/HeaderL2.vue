<template>
  <div id="buttonsL2">
    <!-- opsdetails is an alias for place, used in the original M4OPS -->
    <el-tooltip
      class="item"
      effect="light"
      content="Select from the dropdown to change whether
        the current display is one map
        with an overlay and opacity slider,
        side by side maps, or one map with a spyglass"
      placement="bottom">
      <SelectMapDisplay/>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      content="Select from the dropdown to change between
        Normal clicking (No lat/lon click),
        and getting lat/lon (in various formats)"
      placement="right-end">
      <SelectActionOnClick/>
    </el-tooltip>
  </div>
</template>

<script>
import './Header.css';
import SelectMapDisplay from './SelectMapDisplay.vue';
import SelectActionOnClick from './SelectActionOnClick.vue';

export default {
  name: 'HeaderR1',
  components: {
    SelectMapDisplay,
    SelectActionOnClick,
  },
  methods: {
    tellMe() {
      console.log('tellMe');
    },
  },
};
</script>

<style>

</style>
