<template>
  <div class="block">
    <!-- Keep using el-cascader -->
    <el-cascader
      :options="placeOptions"
      :show-all-levels="false"
      v-model="selectedOption"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { actions } from 'vuex-api';
import { mapGetters } from 'vuex';

// import { initialCurrentOptionArray } from '../../../initialising/initialState';

export default {
  name: 'ChooseOPS',
  props: {
    currentOptionArray: {
      type: Array,
      // default: () => initialCurrentOptionArray,
      default: () => [
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
      console.log(value);
      this.$store.dispatch(actions.request, {
        baseURL: 'http://localhost:5000/',
        url: `places/${value[3]}`,
        keyPath: ['place'],
      }).then(() => {
        this.$store.dispatch('updateCurrentOptionArray', value);
      }).then(() => {
        this.$store.dispatch('updateView', this.homeView);
      });
    },
  },
};
</script>

<style scoped>

</style>
