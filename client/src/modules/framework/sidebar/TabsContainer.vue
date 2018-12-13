<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <b-tabs
    v-model="activeTab"
    size="is-small"
    @change="selectActiveTab"
  >
    <b-tab-item label="Actions">
      <button
        v-if="profile"
        @click="signOut"
      >
        Sign Out
      </button>

      <p>Content of Actions Tab Pane</p>
    </b-tab-item>
    <b-tab-item label="MFL">
      Content of MFL Tab Pane
    </b-tab-item>
    <b-tab-item label="Upload">
      Content of Upload Tab Pane
    </b-tab-item>
    <b-tab-item label="Time">
      Content of Time Tab Pane
    </b-tab-item>
  </b-tabs>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'TabsContainer',
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
