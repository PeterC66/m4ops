<template>
  <div>
    <OpenButton />
    <HeadAndDesc
      :feature="feature"
    />
    <Images
      v-if="imageOK"
      :feature="feature"
    />
    <HtmlFile
      v-if="htmlOK"
      :feature="feature"
    />
    <EventsInfo
      :feature="feature"
    />
    <FieldDisplayContainer
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
import FieldDisplayContainer from './FieldDisplayContainer.vue';

export default {
  name: 'FeatureInfo',
  components: {
    OpenButton,
    HeadAndDesc,
    Images,
    HtmlFile,
    EventsInfo,
    FieldDisplayContainer,
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
      return f.length > 0;
    },
    htmlOK() {
      const f = getAValueFor('html', this.feature);
      return f.length > 0;
    },
  },
};
</script>

<style scoped>

</style>
