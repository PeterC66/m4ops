<template>
  <div id="buttonsR1">
    <!-- opsdetails is an alias for place, used in the original M4OPS -->
    <el-tooltip
      class="item"
      effect="light"
      content="Return to the original One-Place Study location"
      placement="left">
      <el-button
        type="primary"
        size="medium"
        @click="tellMe()"
      >
        <font-awesome-icon icon="home"/>
      </el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      content="Contact the person responsible for this study"
      placement="left-start">
      <el-button
        type="primary"
        size="medium"
        @click="tellMe()"
      >
        <font-awesome-icon :icon="['far','envelope']"/>
      </el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      content="Provide feedback to the person responsible for M4OPS
        within the Society for One-Place Studies"
      placement="top-start">
      <el-button
        type="primary"
        size="medium"
      >
        <a href="mailto:peter.cooper@one-place-studies.org?subject=M4OPS">
          <font-awesome-icon :icon="['far','envelope']"/>
        </a>
      </el-button>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      content="See the Help documentation"
      placement="top">
      <el-button
        type="primary"
        size="medium"
        @click="tellMe()"
      >
        <font-awesome-icon icon="question-circle"/>
      </el-button>
    </el-tooltip>
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
