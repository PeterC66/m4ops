<template>
  <section style="position: relative">
    <LayersContainer :chosen-layers-mainmap="chosenLayersMainmap"/>
    <TabsContainer :active-tab-name="activeTabName"/>
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
      activeTabName: state => state.framework.activeTabName,
    }),
  },
};
</script>

<style scoped>
</style>
