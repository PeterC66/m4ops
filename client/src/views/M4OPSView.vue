<template>
  <div>
    <section class="section">
      <div class="container">
        <Header :opsdetails="place" />
      </div>
    </section>
    <section class="section">
      <div class="columns is-gapless">
        <div
          v-if="sidebarOpen"
          class="column is-3">
          <!-- was style="position: relative" -->
          <Sidebar/>
        </div>
        <div class="column">
          <!-- was style="position: relative" -->
          <MapContainer
            v-if="!loading"
            :zoom-initial="15"
            :center-initial="[-0.0325, 52.329444]"
          />

          <div
            v-else
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import _ from 'lodash';
import { actions } from 'vuex-api';
import { mapState, mapGetters } from 'vuex';

import Header from '../modules/framework/header/Header.vue';
import Sidebar from '../modules/framework/sidebar/Sidebar.vue';
import MapContainer from '../modules/mapping/components/MapContainer.vue';

export default {
  name: 'M4OPSView',
  components: {
    MapContainer,
    Header,
    Sidebar,
  },
  computed: {
    ...mapState({
      sidebarOpen: state => state.framework.sidebarOpen,
    }),
    ...mapGetters([
      'm4opsdata',
      'places',
      'place',
      'continents',
      'homeView',
    ]),
    loading() {
      return (_.isEmpty(this.places)) ||
        (_.isEmpty(this.continents)) ||
        (_.isEmpty(this.place)) ||
        (_.isEmpty(this.m4opsdata));
    },
  },
  created() {
    if (_.isEmpty(this.places)) {
      this.$store.dispatch(actions.request, {
        baseURL: 'http://localhost:5000/',
        url: 'places',
        keyPath: ['places'],
      });
    }
    if (_.isEmpty(this.continents)) {
      this.$store.dispatch(actions.request, {
        baseURL: 'http://localhost:5000/',
        url: 'continents',
        keyPath: ['continents'],
      });
    }
    if (_.isEmpty(this.place)) {
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
  .b-tooltip {position: absolute; bottom: 1px; left: 0px;}

  /* .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    padding: 0;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }*/
</style>
