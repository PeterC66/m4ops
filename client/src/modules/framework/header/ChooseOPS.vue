<template>
  <div class="block">
    <!-- Keep using el-cascader -->
    <el-cascader
      :options="placeOptions"
      :show-all-levels="false"
      v-model="selectedOption"
      expand-trigger="hover"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { actions } from 'vuex-api';
import { mapGetters } from 'vuex';

export default {
  name: 'ChooseOPS',
  data() {
    return {
      selectedOption: ['Europe', 'England', 'Cambridgeshire', 'HcN'],
    };
  },
  computed: {
    ...mapGetters([
      'continents',
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
        this.$store.dispatch('updateView', this.homeView);
      });
    },
  },
};
</script>

<style scoped>

</style>
