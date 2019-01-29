<template>
  <div
    class="panel-body"
    style="background-color:white"
  >
    <h1>Hi {{ currentUserFullName }}!</h1>
    <p>You're logged in</p>
    <hr>
    <h3>Users from secure api end point:</h3>
    <em v-if="users.loading">
      Loading users...
    </em>
    <span
      v-if="users.error"
      class="text-danger"
    >
      ERROR: {{ users.error }}
    </span>
    <ul v-if="users.items">
      <li
        v-for="user in users.items"
        :key="user.id"
      >
        {{ `${user.firstName} ${user.lastName} (${user.username})` }}
        <span v-if="user.deleting">
          <em> - Deleting...</em>
        </span>
        <span
          v-else-if="user.deleteError"
          class="text-danger"
        >
          - ERROR: {{ user.deleteError }}
        </span>
        <span v-else>
          <button
            class="button is-danger"
            @click="deleteUser(user.id)"
          >
            Delete
          </button>
        </span>
        <ul v-if="isNonemptyArray(user.rightsArray)">
          <li
            v-for="userRight in user.rightsArray"
            :key="userRight.id"
          >
            {{ `└──>${userRight.opsCode || ''} - ${userRight.userRight}` }}
          </li>
        </ul>
        <p v-else>
          └──>No specific rights
        </p>
      </li>
    </ul>
    <p>
      <router-link
        to="/logout"
        class="button is-primary"
      >
        Logout
      </router-link>
      <router-link
        to="/register"
        class="button is-primary"
      >
        Register
      </router-link>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { isNonemptyArray } from '../global/utils';

export default {
  computed: {
    ...mapState({
      account: state => state.users.account,
      users: state => state.users.users.all,
    }),
    ...mapGetters([
      'currentUserFullName',
    ]),
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions({ // was 'users', for namespace
      getAllUsers: 'getAllUsers',
      deleteUser: 'deleteUser',
    }),
    isNonemptyArray: a => isNonemptyArray(a),
  },
};
</script>
