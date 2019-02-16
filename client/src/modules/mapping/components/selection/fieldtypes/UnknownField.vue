<template>
  <p class="resultsProperty">
    {{ `UNKNOWN!!
    ${field.type}: ` }}
    {{ `${field.label}: ` }}
    <span class="resultsPropertyValue">
      {{ field.value }}
    </span>
  </p>
</template>

<script>
export default {
  name: 'UnknownField',
  props: {
    field: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
