<template>
  <div>
    <p>
      <strong>{{ feature.properties.featureid }}</strong>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Images',
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
