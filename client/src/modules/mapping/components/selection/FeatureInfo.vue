<template>
  <div>
    <OpenButton />
    <HeadAndDesc
      :feature="feature"
    />
    <Images
      :v-if="imageOK"
      :feature="feature"
    />
    <HtmlFile
      :feature="feature"
    />
    <EventsInfo
      :feature="feature"
    />
    <SpecifiedFields
      :feature="feature"
    />
  </div>
</template>

<script>
import { getAValueFor } from '../../utils/mapUtils';
import OpenButton from '../features/OpenButton.vue';
import HeadAndDesc from './HeadAndDesc.vue';
import Images from './Images.vue';
import HtmlFile from './HtmlFile.vue';
import EventsInfo from './EventsInfo.vue';
import SpecifiedFields from './SpecifiedFields.vue';

export default {
  name: 'FeatureInfo',
  components: {
    OpenButton,
    HeadAndDesc,
    Images,
    HtmlFile,
    EventsInfo,
    SpecifiedFields,
  },
  props: {
    feature: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageOK() {
      const f = getAValueFor('image', this.feature);
      // eslint-disable-next-line no-console
      console.log(f.length > 0);
      return f.length > 0;
    },
  },
};
</script>

<style scoped>

</style>
