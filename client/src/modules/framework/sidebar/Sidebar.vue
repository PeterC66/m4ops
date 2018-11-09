<template>
  <section style="position: relative">
    <LayersContainer :chosen-layers-mainmap="chosenLayersMainmap"/>
    <TabsContainer :active-tab-number="activeTabNumber"/>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LayersContainer from './LayersContainer.vue';
import TabsContainer from './TabsContainer.vue';

export default {
  name: 'Sidebar',
  components: {
    LayersContainer,
    TabsContainer,
  },
  props: {
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
