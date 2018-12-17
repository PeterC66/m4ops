<template>
  <div>
    <p class="resultsHead">
      <!-- eslint-disable-next-line max-len -->
      {{ textHead }}
    </p>
    <p class="resultsBody">
      {{ textDesc }}
    </p>
  </div>
</template>

<script>
import { getAValueFor, startend } from '../../utils/mapUtils';

export default {
  name: 'HeadAndDesc',
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
  computed: {
    layer() {
      return 0;
    },
    textHead() {
      // eslint-disable-next-line max-len
      return `${getAValueFor('shorttext', this.feature, this.layer)} ${startend(this.feature, this.layer)}`;
    },
    textDesc() {
      return getAValueFor('description', this.feature, this.layer);
    },

  },
};
</script>

<style scoped>

</style>
