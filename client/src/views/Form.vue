<template>
  <div class="about">
    <SampleForm />
  </div>
</template>

<script>
import SampleForm from '../modules/forms/sample.vue';

export default {
  name: 'About',
  components: {
    SampleForm,
  },
};
</script>

<style lang="scss">
  // @import '../global/styles/App.scss';
</style>
