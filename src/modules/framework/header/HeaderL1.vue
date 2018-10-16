<template>
  <!--
  export default function HeaderL1() {
  return (
    <div id="OPSSelect">
      <Popover content={<ChooseOPSContainer />}
          title="Choose OPS" trigger="click" placement="bottomRight">
        <SimpleButton
          tooltip="Open the cascaded dropdown to choose a One-Place Study"
          tooltipPlacement="right"
          icon="chevron-circle-down"
          size="small"
        />
      </Popover>
    </div>
  );
}
-->

  <div id="buttonsL1">
    <!-- opsdetails is an alias for place, used in the original M4OPS -->
    <el-popover
      placement="right"
      width="400"
      trigger="click"
      title="Choose OPS">
      <ChooseOPS/>
      <el-button
        slot="reference"
        type="primary"
        size="medium"
      >
        <font-awesome-icon icon="chevron-circle-down"/>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
import './Header.css';
import ChooseOPS from './ChooseOPS.vue';

export default {
  name: 'HeaderL1',
  components: {
    ChooseOPS,
  },
  props: {
    OPSDetails: {
      type: Object,
      required: true,
    },
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
