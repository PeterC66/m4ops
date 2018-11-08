<template>
  <div
    id="buttonsL1"
    @headerl1-close-popover="closePopover"
  >
    <!-- opsdetails is an alias for place, used in the original M4OPS -->
    <el-popover
      placement="right"
      width="400"
      trigger="click"
      title="Choose OPS"
    >
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
    opsdetails: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    tellMe() {
      console.log('tellMe');
    },
    closePopover() { // TODO ??
      this.visible = false;
    },
  },
};
</script>

<style scoped>

</style>
