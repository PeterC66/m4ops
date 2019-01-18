<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <div
            v-if="alert.message"
            :class="`alert ${alert.type}`"
          >
            {{ alert.message }}
          </div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState({
      alert: state => state.alert,
    }),
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    },
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
    }),
  },
};
</script>
