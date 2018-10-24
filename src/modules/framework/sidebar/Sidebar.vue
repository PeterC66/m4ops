<template>
  <section style="position: relative">
    <LayersContainer :chosen-layers-mainmap="chosenLayersMainmap"/>
    <TabsContainer/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
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
  },
};
</script>

<style scoped>
</style>
