<template>
  <div class="about">
    <div class="container">
      <h1>
        This is an about page
        <font-awesome-icon icon="arrow-up" />
      </h1>
      <anchored-heading :level="1">
        Hello world! at level 1
      </anchored-heading>
      <anchored-heading :level="2">
        Hello world! at level 2
      </anchored-heading>
      <anchored-heading :level="3">
        Hello world! at level 3
      </anchored-heading>
    </div>
    <div class="container">
      <h1>
        This is an about page
        <font-awesome-icon icon="arrow-up" />
      </h1>
      <anchored-heading :level="1">
        Hello world! at level 1
      </anchored-heading>
      <anchored-heading :level="2">
        Hello world! at level 2
      </anchored-heading>
      <anchored-heading :level="3">
        Hello world! at level 3
      </anchored-heading>
    </div>
  </div>
</template>

<script>
import anchoredHeading from '../modules/testing/testHeads';

export default {
  name: 'About',
  components: {
    anchoredHeading,
  },
};
</script>

<style lang="scss">
  // @import '../global/styles/App.scss';
</style>
