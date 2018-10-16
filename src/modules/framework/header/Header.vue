<template>
  <div>
    <!-- <HeaderTitles ops-details="OPSDetails" />
    <HeaderL1 ops-details="OPSDetails" />
    <HeaderL2 />
    <HeaderR2 /> -->
    <HeaderR1 />
  </div>
</template>

<script>
// import HeaderTitles from './HeaderTitles';
import HeaderR1 from './HeaderR1';
// import HeaderR2 from './HeaderR2';
// import HeaderL1 from './HeaderL1';
// import HeaderL2 from './HeaderL2';

export default {
  name: 'Header',
  components: {
    // HeaderTitles,
    HeaderR1,
    // HeaderR2,
    // HeaderL1,
    // HeaderL2,
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
