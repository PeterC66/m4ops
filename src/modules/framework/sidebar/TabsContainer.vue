<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
  >
    <el-tab-pane
      label="Actions"
      name="actions"
    >
      Content of Actions Tab Pane
    </el-tab-pane>
    <el-tab-pane
      label="MFL"
      name="mfl"
    >
      Content of MFL Tab Pane
    </el-tab-pane>
    <el-tab-pane
      label="Upload"
      name="upload"
    >
      Content of Upload Tab Pane
    </el-tab-pane>
    <el-tab-pane
      label="Time"
      name="time"
    >
      Content of Time Tab Pane
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'TabsContainer',
  data() {
    return {
      activeName: 'actions',
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
    },
  },
};
</script>
