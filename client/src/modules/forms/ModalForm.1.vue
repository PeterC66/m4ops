<template>
  <form action="">
    <div
      class="modal-card"
      style="width: auto"
    >
      <header class="modal-header-M4OPS">
        <p class="modal-title-M4OPS">
          Login
        </p>
      </header>
      <section class="modal-card-body modal-body-M4OPS">
        <b-field label="Email">
          <b-input
            type="email"
            :value="email"
            placeholder="Your email"
            required
          />
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            :value="password"
            password-reveal
            placeholder="Your password"
            required
          />
        </b-field>

        <b-checkbox>Remember me</b-checkbox>
      </section>
      <footer class="modal-card-foot modal-footer-M4OPS">
        <button
          class="button"
          type="button"
          @click="$parent.close()"
        >
          Close
        </button>
        <button class="button is-primary">
          Login
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { Portal, PortalTarget } from 'portal-vue';

export default {
  components: {
    Portal,
    PortalTarget,
  },
};
</script>

<style scoped>
/* Based on http://www.bootply.com/s6x5oKLiDG */
/* CSS used here will be applied after bootstrap.css */
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

</style>
