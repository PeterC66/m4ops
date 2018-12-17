<template>
  <div>
    <OpenButton />
    <HeadAndDesc
      :feature="feature"
    />
    <Images
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
};
</script>

<style scoped>

</style>
