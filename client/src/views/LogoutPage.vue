<template>
  <div>
    <h2>Logout</h2>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  created() {
    this.logout();
    this.goBack();
  },
  methods: {
    ...mapActions(['logout']),
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>
