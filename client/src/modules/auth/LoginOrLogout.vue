<template>
  <div>
    <button
      v-if="!authenticated"
      id="qsLoginBtn"
      class="btn btn-primary btn-margin"
      @click="login"
    >
      Log In
    </button>

    <button
      v-if="authenticated"
      id="qsLogoutBtn"
      class="btn btn-primary btn-margin"
      @click="logout"
    >
      Log Out
    </button>
  </div>
</template>

<script>
import auth from './AuthService';

export default {
  name: 'LoginOrLogout',
  props: {
    auth: {
      type: Object,
      required: true,
    },
    authenticated: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    login() {
      auth.login();
    },
    logout() {
      auth.logout();
    },
  },
};
</script>

<style>
/* @import '../node_modules/bootstrap/dist/css/bootstrap.css'; */

.btn-margin {
  margin-top: 7px
}
</style>
