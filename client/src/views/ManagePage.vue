<template>
  <div
    class="panel-body"
    style="background-color:white"
  >
    <h1>Hi {{ account.user.firstName }}!</h1>
    <p>You're logged in with Vue + Vuex & JWT!!</p>
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
        {{ user.firstName + ' ' + user.lastName }}
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
          - <a
            class="text-danger"
            @click="deleteUser(user.id)"
          >
            Delete
          </a>
        </span>
      </li>
    </ul>
    <p>
      <router-link to="/logout">
        Logout
      </router-link>
      <router-link
        to="/register"
        class="btn btn-link"
      >
        Register
      </router-link>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      account: state => state.users.account,
      users: state => state.users.users.all,
    }),
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions({ // was 'users', for namespace
      getAllUsers: 'getAll',
      deleteUser: 'delete',
    }),
  },
};
</script>
