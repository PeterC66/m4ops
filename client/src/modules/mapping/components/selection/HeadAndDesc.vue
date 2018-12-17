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
    textHead() {
      const shortText = getAValueFor('shorttext', this.feature);
      const startEnd = startend(this.feature, this.layer);
      return `${shortText} ${startEnd}`;
    },
    textDesc() {
      return getAValueFor('description', this.feature);
    },

  },
};
</script>

<style scoped>
.resultsHead {text-decoration: underline; color: magenta; margin: 0;}
.resultsBody {color: blue;}

</style>
