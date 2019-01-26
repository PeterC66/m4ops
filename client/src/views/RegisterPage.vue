<template>
  <div class="panel-body">
    <h2>Register</h2>
    <form
      style="background-color:white"
      @submit.prevent="handleSubmit"
    >
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
      />
      <div class="form-group">
        <button
          class="button is-primary"
          :disabled="status.registering || !valid"
        >
          Register
        </button>
        <!-- eslint-disable max-len -->
        <img
          v-show="status.registering"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        >
        <!-- eslint-enable max-len -->
        <button
          class="button is-primary"
          @click="goBack()"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VueFormGenerator from 'vue-form-generator';
// Note import  of vfg.css etc is in main.js
import { userRightsEnum } from '../global/constants';
import { enumToSelect } from '../global/utils';

export default {
  name: 'RegisterPage',
  components: {
    'vue-form-generator': VueFormGenerator.component,
  },
  data() {
    return {
      // Fields from original RegisterPage form: firstName, lastName, username, password
      // model is user in the original form
      model: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        right0: '',
        OPS0: '',
      },
      submitted: false,

      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'First Name',
            model: 'firstName',
            placeholder: 'First name',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Last Name',
            model: 'lastName',
            placeholder: 'Last name',
            required: true,
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'User Name',
            model: 'username',
            id: 'user_name',
            placeholder: 'User Name',
            featured: true,
            required: true,
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password',
            model: 'password',
            min: 6,
            required: true,
            hint: 'Minimum 6 characters',
            validator: 'string',
            validateDebounceTime: 2000,
          },
          {
            type: 'select',
            label: 'Status',
            model: 'right0',
            values() {
              return enumToSelect(userRightsEnum);
            },
          },
          {
            type: 'select',
            label: 'OPS',
            model: 'OPS0',
            values: ['HcN', 'HNB'],
          },
        ],
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        fieldIdPrefix: 'user-',
      },
    };
  },
  computed: {
    // originally ...mapState('account', ['status']) where arg1 is the namespace, arg2 is an array of strings map
    ...mapState({
      status: state => state.users.account.status,
    }),
    valid() {
      return this.model.firstName
      && this.model.lastName
      && this.model.username
      && this.model.password
      && (this.model.password.length >= 6);
    },
  },
  methods: {
    // originally ...mapActions('account', ['register']), where arg1 is the namespace
    ...mapActions(['register']),
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
      // temporarily have just one element in the rightsArray
      const userDetails = { ...this.model };
      if (this.model.right0) {
        userDetails.rightsArray = [
          { userRight: this.model.right0, opsCode: this.model.OPS0 },
        ];
      }
      delete userDetails.right0;
      delete userDetails.OPS0;
      // Can assume valid
      // eslint-disable-next-line no-console
      console.log('in handleSubmit', this.model, userDetails);
      this.register(userDetails);
      // this.$router.push('/');
    },
  },
};
</script>
