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
  </div>
</template>

<script>
import _ from 'lodash';
import { actions } from 'vuex-api';
import { mapState, mapGetters, mapActions } from 'vuex';

import Header from '../modules/framework/header/Header.vue';
import Sidebar from '../modules/framework/sidebar/Sidebar.vue';
import MapContainer from '../modules/mapping/components/MapContainer.vue';

import { initialOpsCode } from '../initialising/initialState';
import initialiseProjections from '../modules/mapping/projections';

import { protectionStatusEnum, userRightsEnum } from '../global/constants';

function checkAuthorisation(caller, store) {
  // Called from both mounted() and beforeUpdate() to:
  //   check whether the current user can do everything in the URL (now in vuex route store)
  //   and then report any issues and/or move the data to the relevant bits of vuex and let the maps component open

  /* eslint-disable no-console, no-multiple-empty-lines, no-empty, no-unused-vars, max-len, padded-blocks */

  const errorsToReport = [];
  const canContinue = true;

  // Find out about the current user and desired OPS
  if (caller === 'Created') console.log('cA0', store.state);
  const currentUser = store.state.users.account;
  const currentUserLoggedIn = currentUser.status.loggedIn;
  const currentOPSCode = store.getters.place.OPSCode;
  const desiredOPSCode = store.state.route.params.ops || initialOpsCode;


  if (currentUser.status.loggedIn) {
    console.log('loggedIn', currentUser);

  } else {
    console.log('Not loggedIn', currentUser);

  }

  // Report any errors


  // We are OK to go - move the data to the relevant bits of vuex so this component can mount
  if (!currentOPSCode || (currentOPSCode !== desiredOPSCode)) {
    const loadingId = 'place';
    store.dispatch('startLoading', loadingId);
    store.dispatch(actions.request, {
      baseURL: process.env.VUE_APP_BACKEND_URL,
      url: `places/${desiredOPSCode}`,
      keyPath: ['place'],
    })
      .then(() => {
      // The state has been updated and you can do whatever you want with it
      // eslint-disable-next-line
      store.dispatch('initialiseChosenLayers', desiredOPSCode);
      })
      .then(() => {
        store.dispatch('updateView', store.getters.homeView);
      })
      .then(() => {
        store.dispatch('updateCurrentOptionArray', store.getters.getOptionsArrayByPlace(desiredOPSCode));
      })
      .then(() => {
        store.dispatch('endLoading', loadingId);
      });
  }



  /* eslint-enable no-console, no-multiple-empty-lines, no-empty, no-unused-vars, max-len */
}

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
      return !_.isEmpty(this.loadingIds);
    },
    // isloading() {
    //   return false
    //     || (_.isEmpty(this.places))
    //     || (_.isEmpty(this.continents))
    //     || (_.isEmpty(this.place))
    //     || (_.isEmpty(this.m4opsdata));
    // },
  },
  watch: {
    // call again the method if the route changes
    $route() {
      checkAuthorisation('Watch', this.$store);
    },
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
    initialiseProjections();
    checkAuthorisation('Created', this.$store);
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
