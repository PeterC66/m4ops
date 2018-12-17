<template>
  <div
    id="resultsSideBar"
  >
    <ColourKey />
    <FeatureInfo
      v-for="feature in features"
      :key="feature.id"
      :feature="feature"
    />
  </div>
</template>

<script>
import ColourKey from './ColourKey.vue';
import FeatureInfo from './FeatureInfo.vue';

export default {
  name: 'ResultsSidebar',
  components: {
    ColourKey,
    FeatureInfo,
  },
  props: {
    features: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
  #resultsSideBar {
    position: absolute;
    top: 80px;
    right: 8px;
    width: 20%;
    bottom: 20px;
    overflow: visible;
    z-index: 20000;
    pointer-events: none;
    background-color: white;
    word-wrap: break-word;
  }
</style>
