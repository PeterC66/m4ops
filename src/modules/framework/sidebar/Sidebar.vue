<template>
  <section style="position: relative">
    <LayersContainer />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import LayersContainer from './LayersContainer.vue';

export default {
  name: 'Sidebar',
  components: {
    LayersContainer,
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'layerOptions',
    ]),
  },
};
</script>

<style scoped>

</style>
