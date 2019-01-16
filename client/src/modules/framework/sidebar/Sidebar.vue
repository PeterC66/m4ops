<template>
  <section style="position: relative">
    <LayerChoicesContainer :chosen-layers-mainmap="chosenLayersMainmap" />
    <UserStatus />
    <TabsContainer :active-tab-number="activeTabNumber" />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LayerChoicesContainer from './LayerChoicesContainer.vue';
import TabsContainer from './TabsContainer.vue';
import UserStatus from './UserStatus.vue';

export default {
  name: 'Sidebar',
  components: {
    LayerChoicesContainer,
    TabsContainer,
    UserStatus,
  },
  computed: {
    ...mapGetters([
      'chosenLayersMainmap',
    ]),
    ...mapState({
      activeTabNumber: state => state.framework.activeTabNumber,
    }),
  },
};

</script>

<style scoped>
</style>
