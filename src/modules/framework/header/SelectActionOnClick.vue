<template>
  <el-select
    v-model="value"
    size="small"
    placeholder="Select Action on Click"
    automatic-dropdown
    @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"/>
  </el-select>
</template>

<script>
export default {
  name: 'SelectActionOnClick',
  data() {
    return {
      options: [{
        value: 'no',
        label: 'No lat/lon click',
      }, {
        value: 'm4opscsv',
        label: 'M4OPS lon;lat csv',
      }, {
        value: 'm4opsparam',
        label: 'M4OPS parameters',
      }, {
        value: 'csv',
        label: 'lat,lon csv',
      }, {
        value: 'geojson',
        label: 'lon,lat GeoJSON',
      }, {
        value: 'epsg3857',
        label: 'EPSG:3857 (x/y)',
      }, {
        value: 'hdms',
        label: 'DegMinSec N/E',
      }, {
        value: 'geohack',
        label: 'GeoHack links',
      }],
      value: 'no',
    };
  },
  methods: {
    handleChange() {
      console.log('handleChange');
    },
  },
};
</script>
