<template>
  <section style="position: relative">
    <HeaderTitles :opsdetails="opsdetails" />
    <HeaderL1 :opsdetails="opsdetails" />
    <HeaderL2 />
    <HeaderR1 />
    <HeaderR2 />
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
