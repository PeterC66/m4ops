<template>
  <section style="position: relative">
    <!-- <LoginOrLogout
      :auth="auth"
      :authenticated="authenticated"
    /> -->
    <LayerChoicesContainer :chosen-layers-mainmap="chosenLayersMainmap" />
    <TabsContainer :active-tab-number="activeTabNumber" />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import LoginOrLogout from '../../auth/LoginOrLogout.vue';
import LayerChoicesContainer from './LayerChoicesContainer.vue';
import TabsContainer from './TabsContainer.vue';

export default {
  name: 'Sidebar',
  components: {
    // LoginOrLogout,
    LayerChoicesContainer,
    TabsContainer,
  },
  // props: {
  //   auth: {
  //     type: Object,
  //     required: true,
  //   },
  //   authenticated: {
  //     type: Boolean,
  //     required: true,
  //   },
  // },
  computed: {
    ...mapGetters([
      'chosenLayersMainmap',
    ]),
    ...mapState({
      activeTabNumber: state => state.framework.activeTabNumber,
    }),
  },
};

</script>

<style scoped>
</style>
