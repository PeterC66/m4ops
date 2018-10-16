<template>
  <el-container>
    <el-header height ="60px">Header</el-header>
    <el-container>
      <el-aside width="300px">Aside</el-aside>
      <el-main>
        <MainMap
          :zoom-initial="15"
          :center-initial="[-0.0325, 52.329444]"
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MainMap from '../modules/mapping/components/MainMap.vue';

export default {
  name: 'M4OPSView',
  components: {
    MainMap,
  },
};
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
