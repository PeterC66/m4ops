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
        @click="showPortal({title: 'Log in', formId: formIdForThis})"
      >
        Log In
        <component :is="'ModalOuter'">
          <ModalInnerForForms :form-id="formIdForThis" />
          <span slot="footer">
            <button class="button is-primary">
              Login
            </button>
          </span>
        </component>
      </button>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalInnerForForms from '../../forms/ModalInnerForForms.vue';

export default {
  name: 'UserStatus',
  components: {
    ModalInnerForForms,
  },
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
      login: 'login',
      logout: 'logout',
    }),
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      // this.submitted = true;
      const { username, password } = this.model;
      if (username && password) {
        this.login({ username, password });
      }
      this.goBack();
    },
  },
};
</script>
