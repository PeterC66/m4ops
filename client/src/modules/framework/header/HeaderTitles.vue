<template>
  <!-- opsdetails is an alias for place, used in the original M4OPS -->
  <div id="headertitles"/>
</template>

<script>
// import './HeaderTitles.css';

export default {
  name: 'HeaderTitles',
  props: {
    opsdetails: {
      type: Object,
      default: () => ({ OPSCode: 'HcN', OPSName: 'Needingworth2' }),
    },
  },
  computed: {
    placename() {
      return this.opsdetails ?
        `${this.opsdetails.OPSCode}) ${this.opsdetails.OPSName}` :
        '';
    },
  },
  methods: {
    tellMe() {
      console.log('tellMe');
    },
  },
};
</script>

<style scoped>

</style>
