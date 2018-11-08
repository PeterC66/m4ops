<template>
  <section style="position: relative">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <HeaderL1 :opsdetails="opsdetails" />
        </div>
      </div>
      <p class="level-item has-text-centered">
        <a class="link is-info">Home</a>
      </p>
      <div class="level-right">
        <div class="level-item">
          <HeaderR1 />
        </div>
      </div>
    </div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <HeaderL2 />
        </div>
      </div>
      <p class="level-item has-text-centered">
        <a class="link is-info">Home</a>
      </p>
      <div class="level-right">
        <div class="level-item">
          <HeaderR2 />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderTitles from './HeaderTitles.vue';
import HeaderR1 from './HeaderR1.vue';
import HeaderR2 from './HeaderR2.vue';
import HeaderL1 from './HeaderL1.vue';
import HeaderL2 from './HeaderL2.vue';

export default {
  name: 'Header',
  components: {
    HeaderTitles,
    HeaderR1,
    HeaderR2,
    HeaderL1,
    HeaderL2,
  },
  props: {
    opsdetails: {
      type: Object,
      default: () => ({ OPSCode: 'HcN', OPSName: 'Needingworth1' }),
    },
  },
};
</script>

<style scoped>

</style>
