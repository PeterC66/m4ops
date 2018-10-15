<template>
  <el-container>
    <el-header height ="60px">Header</el-header>
    <el-container>
      <el-aside width="300px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// import M4OPSHeader from '../components/M4OPSHeader.vue';
// <div>
//   <M4OPSHeader msg="Testing"/>
// </div>

export default {
  name: 'M4OPSView',
  // components: {
  //   M4OPSHeader,
  // },
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
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
