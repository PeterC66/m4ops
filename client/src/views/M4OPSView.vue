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
          <div
            v-if="isLoading"
            id="isLoading"
          >
            <font-awesome-icon :icon="['fas','spinner']" size="10x" spin/>
          </div>
          <MapContainer
            v-else
            :zoom-initial="15"
            :center-initial="[-0.0325, 52.329444]"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import _ from 'lodash';
import { actions } from 'vuex-api';
import { mapState, mapGetters, mapActions } from 'vuex';

import Header from '../modules/framework/header/Header.vue';
import Sidebar from '../modules/framework/sidebar/Sidebar.vue';
import MapContainer from '../modules/mapping/components/MapContainer.vue';

import { initialCurrentOptionArray } from '../initialising/initialState';
import initialiseProjections from '../modules/mapping/projections';

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
      loadingIds: state => state.framework.loadingIds,
    }),
    ...mapGetters([
      'm4opsdata',
      'places',
      'place',
      'continents',
      'homeView',
    ]),
    isLoading() {
      // eslint-disable-next-line no-console, max-len
      console.log(this.loadingIds.length, (this.loadingIds.length > 0) ? 'loading' : 'ready');
      return this.loadingIds.length > 0;
    },
    // isloading() {
    //   return (_.isEmpty(this.places)) ||
    //     (_.isEmpty(this.continents)) ||
    //     (_.isEmpty(this.place)) ||
    //     (_.isEmpty(this.m4opsdata));
    // },
  },
  created() {
    if (_.isEmpty(this.places)) {
      const loadingId = 'places';
      this.$store.dispatch('startLoading', loadingId);
      this.$store.dispatch(actions.request, {
        baseURL: process.env.VUE_APP_BACKEND_URL,
        url: 'places',
        keyPath: ['places'],
      }).then(() => {
        this.$store.dispatch('endLoading', loadingId);
      });
    }
    if (_.isEmpty(this.continents)) {
      const loadingId = 'continents';
      this.$store.dispatch('startLoading', loadingId);
      this.$store.dispatch(actions.request, {
        baseURL: process.env.VUE_APP_BACKEND_URL,
        url: 'continents',
        keyPath: ['continents'],
      }).then(() => {
        this.$store.dispatch('endLoading', loadingId);
      });
    }
    if (_.isEmpty(this.m4opsdata)) {
      const loadingId = 'm4opsdata';
      this.$store.dispatch('startLoading', loadingId);
      this.$store.dispatch(actions.request, {
        baseURL: process.env.VUE_APP_BACKEND_URL,
        url: 'm4opsdata',
        keyPath: ['m4opsdata'],
      }).then(() => {
        this.$store.dispatch('endLoading', loadingId);
      });
    }
    if (_.isEmpty(this.place)) {
      const loadingId = 'place';
      this.$store.dispatch('startLoading', loadingId);
      this.$store.dispatch(actions.request, {
        baseURL: process.env.VUE_APP_BACKEND_URL,
        url: `places/${initialCurrentOptionArray[3]}`,
        keyPath: ['place'],
      }).then(() => {
        // The state has been updated and you can do whatever you want with the resp
        // eslint-disable-next-line max-len
        this.$store.dispatch('initialiseChosenLayers', initialCurrentOptionArray[3]);
      }).then(() => {
        this.$store.dispatch('updateView', this.homeView);
      }).then(() => {
        this.$store.dispatch('endLoading', loadingId);
      });
    }
    initialiseProjections();
  },
  methods: {
    ...mapActions([
      'startLoading',
      'endLoading',
    ]),
  },
};
</script>

<style scoped>
  .b-tooltip {position: absolute; bottom: 1px; left: 0px;}
  #isLoading {
    color:blue;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

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
