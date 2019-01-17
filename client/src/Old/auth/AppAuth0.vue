<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a
            class="navbar-brand"
            href="#"
          >
            Auth0 - Vue
          </a>

          <router-link
            to="/"
            class="btn btn-primary btn-margin"
          >
            Home
          </router-link>

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
      </div>
    </nav>

    <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated"
      />
    </div>
  </div>
</template>

<script>
import auth from './modules/auth/AuthService';

export default {
  name: 'App',
  data() {
    return {
      auth,
      authenticated: auth.authenticated,
    };
  },
  created() {
    auth.authNotifier.on('authChange', (authState) => {
      this.authenticated = authState.authenticated;
    });

    auth.renewSession();
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
