<template>
  <div id="app">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item">
          <router-link to="/">Home</router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/maps">Maps</router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/about">About</router-link>
        </div>
      </div>
      <!-- navbar items, navbar burger... -->
      <div class="navbar-menu">
        <div class="navbar-start">
          <!-- navbar items -->
        </div>

        <div class="navbar-end">
        <!-- navbar items -->
      </div>      </div>
    </nav>
    <!-- component matched by the route will render here -->
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import './global/styles/Buefy.scss';

  body { background: #f1e8f1 url(./assets/images/backdropDEV.png) repeat-x;}
  /* PROD: #EEF2E9 url(../../assets/images/backdrop.png) repeat-x;*/
</style>

<style scoped>

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

/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  background-color: #B3C0D1;
  color: #333;
  padding: 2px;
  text-align: left;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
