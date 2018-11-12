<template>
  <div class="columns is-gapless">
    <div class="column is-1">
      <img
        alt="Vue logo"
        src="../assets/logo.png"
      >

    </div>
    <div class="column">
      <div class="home">
        <img
          alt="Vue logo"
          src="../assets/logo.png"
        >
        <HelloWorld msg="Welcome to Peter's Vue.js App"/>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
