<template>
  <div id="app">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <div class="navbar-item">
          <router-link to="/">
            Home
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/maps/">
            Maps
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/form">
            Form
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/manage">
            Manage
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/about">
            About
          </router-link>
        </div>
      </div>
      <!-- navbar items, navbar burger... -->
      <div class="navbar-menu">
        <div class="navbar-start">
          <!-- navbar items -->
        </div>

        <div class="navbar-end">
        <!-- navbar items -->
        </div>
      </div>
    </nav>
    <!-- component matched by the route will render here -->
    <router-view />
    <!-- component with  <portal to="xxx"> will render here -->
    <portal-target :name="portalName" />
  </div>
</template>

<script>
// import auth from './modules/auth/AuthService';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState({
      portalName: state => state.forms.portalName,
    }),
  },
  methods: {
    ...mapActions({
      getAllUsers: 'getAllUsers',
    }),
  },

};

</script>

<style lang="scss">
  @import './global/styles/Buefy.scss';

  html { overflow: hidden; }
  body {
    overflow: hidden;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: Trebuchet MS, Trebuchet, Arial, sans-serif;
    background: #f1e8f1 url(./assets/images/backdropDEV.png) repeat-x;
  }
      /* PROD: #EEF2E9 url(../../assets/images/backdrop.png) repeat-x;*/
</style>

<style scoped>
/* Based on http://www.bootply.com/s6x5oKLiDG */
.modal-header-M4OPS {
  padding:9px 15px;
  border-bottom:1px solid #eee;
  background-color: #729246;
  -webkit-border-top-left-radius: 5px;
  -webkit-border-top-right-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-topright: 5px;
   border-top-left-radius: 5px;
   border-top-right-radius: 5px;
}
.modal-title-M4OPS {color:#fff;}
.modal-body-M4OPS {background-color: #F8F8F8;}
.modal-footer-M4OPS {background-color: #EEF2E9;}

.navbar-item,
.navbar-link {
  padding: 0.05rem 0.75rem;
}
a {
  color: white;
}

a.router-link-exact-active {
  color: yellow;
}

</style>
