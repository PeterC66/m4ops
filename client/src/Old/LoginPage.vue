<template>
  <div class="panel-body">
    <h2>Login</h2>
    <form
      style="background-color:white"
      @submit.prevent="handleSubmit"
    >
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
      />
      <button
        class="button is-primary"
        :disabled="status.loggingIn"
      >
        Login
      </button>
      <!-- eslint-disable max-len -->
      <img
        v-show="status.loggingIn"
        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
      >
      <!-- eslint-enable max-len -->
      <router-link
        to="/register"
        class="button is-primary"
      >
        Register
      </router-link>
      <button
        class="button is-primary"
        @click="goBack()"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VueFormGenerator from 'vue-form-generator';
// Note import  of vfg.css etc is in main.js

export default {
  name: 'LoginPage',
  components: {
    'vue-form-generator': VueFormGenerator.component,
  },
  data() {
    return {
      model: {
        username: '',
        password: '',
      },
      submitted: false,

      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'User Name',
            model: 'username',
            required: true,
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password',
            model: 'password',
          },
        ],
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
      },
    };
  },
  computed: {
    // originally ...mapState('account', ['status']) where arg1 is the namespace, arg2 is an array of strings map
    ...mapState({
      status: state => state.users.account.status,
    }),
  },
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions(['login', 'logout']), // was 'account', for namespace
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this.model;
      if (username && password) {
        this.login({ username, password });
      }
      this.goBack();
    },
  },
};
</script>
