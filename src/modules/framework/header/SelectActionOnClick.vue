<template>
  <el-select
    v-model="value"
    size="small"
    automatic-dropdown
    @change="updateActionOnClick"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { mapActions } from 'vuex';

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
    ...mapActions([
      'updateActionOnClick',
    ]),
  },
};
</script>
