<template>
  <div>
    <a
      target="_blank"
      title="Click for a zoomable version in a new tab"
    >
      <!-- href="JuiceBoxSozi/sozi.php
      ?T=${encodeURIComponent(getAValueFor('shorttext', feature))}
      &I=${encodeURIComponent(fullOpsURL(`Images/${imagefile}`))}"
      -->
      <img
        :src="fullFilename"
        style="max-width: 100%;"
      >
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { getAValueFor } from '../../utils/mapUtils';

/* eslint-disable no-console */

export default {
  name: 'Images',
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'OPSDetails',
    ]),
    filename() {
      const f = getAValueFor('image', this.feature);
      if (f.length === 0) console.log('blank image', this.feature);
      return f;
    },
    fullFilename() {
      // eslint-disable-next-line max-len
      const fn = `/OPS/${this.OPSDetails.OPSCode}/${this.filename}`;
      return fn;
    },
  },
};
</script>

<style scoped>

</style>
