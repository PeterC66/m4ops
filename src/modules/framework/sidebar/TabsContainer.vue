<template>
  <el-tabs
    v-model="activeName"
    @tab-click="selectTab"
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TabsContainer',
  data() {
    return {
      activeName: 'actions',
    };
  },
  computed: {
    ...mapState({
      activeTabName: state => state.framework.activeTabName,
    }),
  },
  methods: {
    ...mapActions([
      'selectTab',
    ]),
  },
};
</script>
