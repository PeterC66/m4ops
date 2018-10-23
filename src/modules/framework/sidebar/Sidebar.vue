<template>
  <section style="position: relative">
    <LayersContainer :chosen-ldids-mainmap="chosenLdidsMainmap"/>
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
      'chosenLdidsMainmap',
    ]),
  },
};
</script>

<style scoped>
</style>
