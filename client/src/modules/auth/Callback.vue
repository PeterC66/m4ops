<template>
  <div
    id="isAuthorising"
  >
    <font-awesome-icon
      :icon="['fas','spinner']"
      size="6x"
      spin
    />
  </div>
</template>

<script>
export default {
  name: 'Callback',
  props: {
    auth: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.auth.handleAuthentication();
  },
};
</script>

<style>
  #isAuthorising {
    color:red;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  </style>
