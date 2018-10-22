<template>
  <section style="position: relative">
    <LayersContainer :opsdetails="opsdetails" />
  </section>
</template>

<script>
import LayersContainer from './LayersContainer.vue';

export default {
  name: 'Sidebar',
  components: {
    LayersContainer,
  },
  props: {
  },
};
</script>

<style scoped>

</style>
