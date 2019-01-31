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
// import { actions } from 'vuex-api';
import { mapGetters } from 'vuex';
import { validateUserAndSetInitialValues } from '../../users/validateEtc';

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
      validateUserAndSetInitialValues({ ops: value[3] });
    },
  },
};
</script>

<style scoped>

</style>
