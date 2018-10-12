<template>
  <div>
    <M4OPSHeader msg="Testing"></M4OPSHeader>
  </div>
</template>

<script>
import M4OPSHeader from "../components/M4OPSHeader.vue";

export default {
  name: "M4OPSView",
  components: {
    M4OPSHeader
  },
  props: {
    msg: String
  }
};
</script>
