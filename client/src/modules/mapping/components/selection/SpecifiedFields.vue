<template>
  <div>
    <!-- eslint-disable max-len -->
    <p>
      Feature: {{ JSON.stringify({ id: feature.id, properties: feature.properties }) }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'SpecifiedFields',
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
