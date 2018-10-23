<template>
  <section style="position: relative">
    <LayersContainer :chosen-ldids-mainmap="chosenLdidsMainmap"/>
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
      'chosenLdidsMainmap',
    ]),
  },
};
</script>

<style scoped>
</style>
