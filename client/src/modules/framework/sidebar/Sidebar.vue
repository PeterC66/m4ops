<template>
  <section style="position: relative">
    <LayerChoicesContainer :chosen-layers-mainmap="chosenLayersMainmap" />
    <TabsContainer :active-tab-number="activeTabNumber" />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LayerChoicesContainer from './LayerChoicesContainer.vue';
import TabsContainer from './TabsContainer.vue';

export default {
  name: 'Sidebar',
  components: {
    LayerChoicesContainer,
    TabsContainer,
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
