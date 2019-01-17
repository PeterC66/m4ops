<template>
  <div>
    <p
      v-if="alert.message"
      :class="`alert ${alert.type}`"
    >
      {{ alert.message }}
    </p>
    <p>
      User Peter
           <!-- User {{ account.user.firstName }} -->
           <!-- login resets status on creation -->
           <router-link to="/login">
             Logout
           </router-link>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      account: state => state.users.account,
      users: state => state.users.users.all,
      alert: state => state.users.alert,
    }),
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    },
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions('users', {
      getAllUsers: 'getAll',
      deleteUser: 'delete',
      clearAlert: 'alert/clear',
    }),
  },
};
</script>
