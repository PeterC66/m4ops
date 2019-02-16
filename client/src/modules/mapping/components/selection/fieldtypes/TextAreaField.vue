<template>
  <p class="resultsProperty">
    {{ `${field.label}: ` }}
    <span class="resultsPropertyValue">
      {{ field.value }}
    </span>
  </p>
</template>

<script>
export default {
  name: 'TextAreaField',
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
