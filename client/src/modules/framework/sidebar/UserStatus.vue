<template>
  <div>
    <p
      v-if="alert.message"
      :class="`alert ${alert.type}`"
    >
      {{ alert.message }}
    </p>
    <p
      v-if="account.user"
    >
      User {{ account.user.firstName }}
      <button
        class="button is-primary is-small"
        @click="logout"
      >
        Logout
      </button>
    </p>
    <p
      v-else
    >
      Guest
      <button
        class="button is-primary is-small"
        @click="showPortal({
          portalName: 'ModalForForms',
          title: 'Log in',
          formId: formIdForThis,
          actionTextsArray: ['Log in'],
        })"
      >
        Log In
      </button>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserStatus',
  data() {
    return {
      formIdForThis: 'LogIn',
    };
  },
  computed: {
    ...mapState({
      account: state => state.users.account,
      users: state => state.users.users.all,
      alert: state => state.users.alert,
    }),
    ...mapGetters([
      'thisFormSpec',
    ]),
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    },
  },
  methods: {
    ...mapActions({ // was 'users',
      clearAlert: 'alert/clear',
      showPortal: 'showPortal',
      logout: 'logout',
    }),
  },
};
</script>

<style scoped>
  .alert{color:white; background:red};
</style>
