<template>
  <div>
    <OpenButton/>
    <p>
      <strong>{{ feature.properties.featureid }}</strong>
    </p>
    <!-- eslint-disable max-len -->
    <p>
      Feature: {{ JSON.stringify({ id: feature.id, properties: feature.properties }) }}
    </p>
    <!-- eslint-enable max-len -->
  </div>
</template>

<script>
import OpenButton from '../features/OpenButton.vue';

export default {
  name: 'FeatureInfo',
  components: {
    OpenButton,
  },
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
};
</script>
