<template>
  <div>
    <!-- opsdetails is an alias for place, used in the original M4OPS -->
    <el-tooltip
      class="item"
      effect="light"
      content="Return to the original One-Place Study location"
      placement="left">
      <el-button
        type="primary"
        size="small"
        @click="tellMe()"
      >
        <font-awesome-icon icon="home"/>
      </el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      content="Contact the person responsible for this study"
      placement="left">
      <el-button
        type="primary"
        size="small"
        @click="tellMe()"
      >
        <font-awesome-icon :icon="['far','envelope']"/>
      </el-button>
    </el-tooltip>

    <!--
      onClick={tellMe}
    />
    <SimpleButton
      tooltip="Provide feedback to the person responsible for M4OPS within the Society for One-Place Studies"
      tooltipPlacement="leftBottom"
      icon="comment"
      size="small"
      href="mailto:peter.cooper@one-place-studies.org?subject=M4OPS"
    />
    <SimpleButton
      tooltip="See the Help documentation"
      tooltipPlacement="leftBottom"
      icon="question-circle"
      size="small"
      onClick={tellMe}
    />
  </div>
);

export default HeaderR1;
-->
  </div>
</template>

<script>
import './Header.css';

export default {
  name: 'HeaderR1',
  methods: {
    tellMe() {
      console.log('tellMe');
    },
  },
};
</script>

<style>

</style>
