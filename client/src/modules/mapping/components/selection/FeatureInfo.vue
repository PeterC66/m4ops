<template>
  <div>

    <p>
      Feature with ID <strong>{{ feature.id }}</strong>
    </p>
    <!-- eslint-disable max-len -->
    <p>
      Feature: {{ JSON.stringify({ id: feature.id, properties: feature.properties }) }}
    </p>
    <!-- eslint-enable max-len -->
  </div>
</template>

<script>
export default {
  name: 'FeatureInfo',
  components: {
  },
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
};
</script>
