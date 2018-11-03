<template>
  <div>
    <h1> {{ msg }}
      <font-awesome-icon icon="arrow-up" />
      <font-awesome-icon icon="arrow-down" />
      <!-- In full <font-awesome-icon icon="[ 'fas', 'arrow-up' ]" />
       (fas = solid - is the default) -->
    </h1>
  </div>
</template>

<script>
export default {
  name: 'M4OPSHeader',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
};
</script>
