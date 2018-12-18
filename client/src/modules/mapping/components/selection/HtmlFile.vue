<template>
  <div>
    <!-- TODO -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import {
  getAValueFor,
  encodedFullOpsURL,
} from '../../utils/mapUtils';

// TODO
function htmlFromFile(filename) {
  return filename;
}

function withinTags(str, tag) {
  // Find everything between the (first) given <tag...> and the last </tag> (ie not greedy)
  // Don't use /g as it throws away the captures
  // Note double slashes before s and S as we are using the string method
  // See Comments under heading Regular Expressions
  const regex = new RegExp(`(?:<${tag}.*>)([\\s\\S]*)(?:</${tag}>)`);
  const result = str.match(regex);
  if (result) {
    return result[1]; // result is an array, without /g [0] is the match, [1] is the (first) capture
  }
  return str;
}

function tailorImgs(str) {
  // adapt all img elements for sozi etc
  // Note the *? makes it 'lazy' - see https://javascript.info/regexp-greedy-and-lazy
  function replacer(match, fn1, fn2) {
    // fn1 (eg BEACH STREET - 2 (EB32)) and fn2 (eg Img1.jpeg) are the two parts of the filename
    // eslint-disable-next-line max-len
    return `<a target="_blank" title="Click for a zoomable version in a new tab" href="JuiceBoxSozi/sozi.php?T=${encodeURIComponent(fn1)}&I=${encodedFullOpsURL('HTML/', fn1 + fn2)}"><img src="${encodedFullOpsURL('HTML/', fn1 + fn2)}" style="max-width: 100%;"></a>`;
  }
  // See Comments under heading Regular Expressions (? means non-capturing
  // eslint-disable-next-line max-len
  return str.replace(/(?:<img )(?:[\s\S]*?)(?:src=")([\s\S]*?)(Img\d*\S*)(?:">)/g, replacer);
}

export default {
  name: 'HtmlFile',
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
      const f = getAValueFor('html', this.feature);
      // eslint-disable-next-line no-console
      if (f.length === 0) console.log('blank html', this.feature);
      return f;
    },
    htmlOfBody() {
      const htmlPageText = htmlFromFile(this.filename);
      const htmlOfBody = withinTags(htmlPageText, 'body');
      return tailorImgs(withinTags(htmlOfBody, 'font'));
    },
  },
};
</script>

<style scoped>

</style>
