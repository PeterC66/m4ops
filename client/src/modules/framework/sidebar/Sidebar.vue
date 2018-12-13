<template>
  <section style="position: relative">
    <div
      v-if="!profile"
      @click="signIn"
    >
      <button>
        Sign In
      </button>
    </div>
    <div v-else>
      <LayerChoicesContainer :chosen-layers-mainmap="chosenLayersMainmap" />
      <TabsContainer :active-tab-number="activeTabNumber" />
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LayerChoicesContainer from './LayerChoicesContainer.vue';
import TabsContainer from './TabsContainer.vue';
import auth0Client from '../../auth/AuthService';

export default {
  name: 'Sidebar',
  components: {
    LayerChoicesContainer,
    TabsContainer,
  },
  props: {
  },
  data() {
    return {
      profile: null,
    };
  },
  computed: {
    ...mapGetters([
      'chosenLayersMainmap',
    ]),
    ...mapState({
      activeTabNumber: state => state.framework.activeTabNumber,
    }),
  },
  methods: {
    signIn: auth0Client.signIn,
  },
};

/*

export default {
  name: 'HelloWorld',
  data () {
    return {
      microPosts: [],
      error: '',
      profile: null
    }
  },
  async created () {
    try {
      this.microPosts = await MicroPostService.getMicroPosts()
      this.profile = auth0Client.getProfile()
    } catch (error) {
      this.error = error.message
    }
  },
  methods: {
    signIn: auth0Client.signIn,
    signOut: auth0Client.signOut
  }
}
*/

</script>

<style scoped>
</style>
