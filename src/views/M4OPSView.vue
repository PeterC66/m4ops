<template>
  <el-container>
    <el-header><Header :opsdetails="OPSDetails" /></el-header>
    <el-container>
      <el-aside width="300px">Aside {{ OPSDetails.OPSCode }}</el-aside>
      <el-main>
        <MainMap
          :zoom-initial="15"
          :center-initial="[-0.0325, 52.329444]"
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { actions } from 'vuex-api';
import { mapGetters } from 'vuex';

import MainMap from '../modules/mapping/components/MainMap.vue';
import Header from '../modules/framework/header/Header.vue';

import '../global/styles/M4OPSLayout.css';

export default {
  name: 'M4OPSView',
  components: {
    MainMap,
    Header,
  },
  computed: {
    ...mapGetters([
      'OPSDetails',
      'homeView',
    ]),
  },
  created() {
    this.$store.dispatch(actions.request, {
      baseURL: 'http://localhost:5000/',
      url: 'continents',
      keyPath: ['continents'],
    });
    this.$store.dispatch(actions.request, {
      baseURL: 'http://localhost:5000/',
      url: 'places/HcN',
      keyPath: ['place'],
    }).then(() => {
    // The state has been updated and you can do whatever you want with the resp
      this.$store.dispatch('updateViewZoom', this.homeView.zoom);
      this.$store.dispatch('updateViewCenter', this.homeView.center);
      this.$store.dispatch('updateViewRotation', this.homeView.rotation);
    });
    this.$store.dispatch(actions.request, {
      baseURL: 'http://localhost:5000/',
      url: 'm4opsdata',
      keyPath: ['m4opsdata'],
    });
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
