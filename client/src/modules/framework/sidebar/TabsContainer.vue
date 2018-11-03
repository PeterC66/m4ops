<template>
  <el-tabs
    v-model="activeName"
    @tab-click="selectActiveTab"
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
import { mapActions } from 'vuex';

export default {
  name: 'TabsContainer',
  props: {
    activeTabName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeName: this.activeTabName,
    };
  },
  methods: {
    ...mapActions([
      'selectActiveTab',
    ]),
  },
};
</script>
