<template>
  <section style="position: relative">
    <!-- <HeaderTitles ops-details="OPSDetails" />
    -->
    <HeaderL1 ops-details="OPSDetails" />
    <HeaderL2 />
    <HeaderR1 />
    <HeaderR2 />
  </section>
</template>

<script>
// import HeaderTitles from './HeaderTitles';
import HeaderR1 from './HeaderR1.vue';
import HeaderR2 from './HeaderR2.vue';
import HeaderL1 from './HeaderL1.vue';
import HeaderL2 from './HeaderL2.vue';

export default {
  name: 'Header',
  components: {
    // HeaderTitles,
    HeaderR1,
    HeaderR2,
    HeaderL1,
    HeaderL2,
  },
  props: {
    OPSDetails: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>

</style>
