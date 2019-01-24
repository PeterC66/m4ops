<template>
  <div class="block">
    <!-- Keep using el-cascader -->
    <el-cascader
      v-model="selectedOption"
      :options="placeOptions"
      :show-all-levels="false"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { actions } from 'vuex-api';
import { mapGetters } from 'vuex';

export default {
  name: 'ChooseOPS',
  props: {
    currentOptionArray: {
      type: Array,
      default: () => [ // TODO ??
        'Europe',
        'England',
        'Cambridgeshire',
        'TRU',
      ],
    },
  },
  data() {
    return {
      selectedOption: this.currentOptionArray,
    };
  },
  computed: {
    ...mapGetters([
      'placeOptions',
      'homeView',
    ]),
  },
  methods: {
    handleChange(value) {
      this.$store.dispatch(actions.request, {
        baseURL: process.env.VUE_APP_BACKEND_URL,
        url: `places/${value[3]}`,
        keyPath: ['place'],
      }).then(() => {
        this.$store.dispatch('updateCurrentOptionArray', value);
      }).then(() => {
        this.$store.dispatch('initialiseChosenLayers', value[3]);
      }).then(() => {
        this.$store.dispatch('updateView', this.homeView);
      });
    },
  },
};
</script>

<style scoped>

</style>
