<template>
  <el-container>
    <el-header><Header :opsdetails="OPSDetails" /></el-header>
    <el-container>
      <el-aside width="300px"><Sidebar/></el-aside>
      <el-main>
        <MapContainer
          :zoom-initial="15"
          :center-initial="[-0.0325, 52.329444]"
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import _ from 'lodash';
import { actions } from 'vuex-api';
import { mapGetters } from 'vuex';

import Header from '../modules/framework/header/Header.vue';
import Sidebar from '../modules/framework/sidebar/Sidebar.vue';
import MapContainer from '../modules/mapping/components/MapContainer.vue';

import '../global/styles/M4OPSLayout.css';

export default {
  name: 'M4OPSView',
  components: {
    MapContainer,
    Header,
    Sidebar,
  },
  computed: {
    ...mapGetters([
      'm4opsdata',
      'OPSDetails',
      'continents',
      'homeView',
    ]),
  },
  created() {
    if (_.isEmpty(this.continents)) {
      this.$store.dispatch(actions.request, {
        baseURL: 'http://localhost:5000/',
        url: 'continents',
        keyPath: ['continents'],
      });
    }
    if (_.isEmpty(this.OPSDetails)) {
      this.$store.dispatch(actions.request, {
        baseURL: 'http://localhost:5000/',
        url: 'places/HcN',
        keyPath: ['place'],
      }).then(() => {
      // The state has been updated and you can do whatever you want with the resp
        this.$store.dispatch('updateView', this.homeView);
      });
    }
    if (_.isEmpty(this.m4opsdata)) {
      this.$store.dispatch(actions.request, {
        baseURL: 'http://localhost:5000/',
        url: 'm4opsdata',
        keyPath: ['m4opsdata'],
      });
    }
  },
};
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    padding: 0;
  }

  /* .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  } */

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
