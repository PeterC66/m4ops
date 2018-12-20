<template>
  <b-tabs
    v-model="activeTab"
    size="is-small"
    @change="selectActiveTab"
  >
    <b-tab-item label="Actions">
      <ActionsPane />
    </b-tab-item>
    <b-tab-item label="MFL">
      <MFLPane />
    </b-tab-item>
    <b-tab-item label="Upload">
      <UploadPane />
    </b-tab-item>
    <b-tab-item label="Time">
      <TimePane />
    </b-tab-item>
  </b-tabs>
</template>

<script>
import { mapActions } from 'vuex';

import ActionsPane from './ActionsPane.vue';
import MFLPane from './MFLPane.vue';
import UploadPane from './UploadPane.vue';
import TimePane from './TimePane.vue';

export default {
  name: 'TabsContainer',
  components: {
    ActionsPane,
    MFLPane,
    UploadPane,
    TimePane,
  },
  props: {
    activeTabNumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      activeTab: this.activeTabNumber,
    };
  },
  methods: {
    ...mapActions([
      'selectActiveTab',
    ]),
  },
};
</script>
