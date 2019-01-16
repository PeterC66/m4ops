<template>
  <div>
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
      account: state => state.account,
      users: state => state.users.all,
    }),
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions('users', {
      getAllUsers: 'getAll',
      deleteUser: 'delete',
    }),
  },
};
</script>
