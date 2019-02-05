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
          class="column is-3"
        >
          <!-- was style="position: relative" -->
          <!-- :auth="auth"
            :authenticated="authenticated" -->
          <Sidebar />
        </div>
        <div class="column">
          <div
            v-if="isLoading"
            id="isLoading"
          >
            <font-awesome-icon
              :icon="['fas','spinner']"
              size="6x"
              spin
            />
          </div>
          <MapContainer
            v-else
            :zoom-initial="15"
            :center-initial="[-0.0325, 52.329444]"
          />
        </div>
      </div>
    </section>
    <ModalForForms />
    <ModalForOPSForms />
    <ModalForMessages />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import { actions } from 'vuex-api';

import Header from '../modules/framework/header/Header.vue';
import Sidebar from '../modules/framework/sidebar/Sidebar.vue';
import MapContainer from '../modules/mapping/components/MapContainer.vue';

import initialiseProjections from '../modules/mapping/projections';
import ModalForForms from '../modules/forms/ModalForForms.vue';
import ModalForOPSForms from '../modules/forms/ModalForOPSForms.vue';
import ModalForMessages from '../modules/forms/ModalForMessages.vue';
// import { initialOpsCode } from '../initialising/initialState';

export default {
  name: 'M4OPSView',
  components: {
    MapContainer,
    Header,
    Sidebar,
    ModalForForms,
    ModalForOPSForms,
    ModalForMessages,
  },
  computed: {
    ...mapState({
      sidebarOpen: state => state.framework.sidebarOpen,
      loadingIds: state => state.framework.loadingIds,
      currentOptionArray: state => state.mapping.currentOptionArray,
      placeStatus: state => state.vuexApi.place.status,
    }),
    ...mapGetters([
      'place',
      'getOptionsArrayByPlace',
    ]),
    isLoading() {
      // eslint-disable-next-line no-console
      console.log(`isLoading placeStatus is ${this.placeStatus}`);
      return !this.placeStatus || this.placeStatus === 'loading';
    },
  },
  created() {
    initialiseProjections();
    //     .then(() => {
    //     });
    // }
  },
  beforeRouteUpdate(to, from, next) {
    // eslint-disable-next-line no-console
    console.log('bRU', to, from);
    next();
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
