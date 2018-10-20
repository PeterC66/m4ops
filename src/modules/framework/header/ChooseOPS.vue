<template>
  <div class="block">
    <el-cascader
      :options="options"
      :show-all-levels="false"
      v-model="selectedOptions"
      expand-trigger="hover"
      @change="handleChange(selectedOptions)"/>
  </div>

</template>

<script>
import { actions } from 'vuex-api';
import { mapGetters } from 'vuex';

export default {
  name: 'ChooseOPS',
  data() {
    // const { continents } = this.$store.state.vuexApi;
    // const continentsData = continents &&
    //   continents.resp &&
    //   continents.resp.data &&
    //   continents.resp.data.data;
    return {
      // options: optionsFromContinents(continentsData),
      selectedOptions: ['Europe', 'England', 'Cambridgeshire', 'HcN'],
    };
  },
  computed: {
    ...mapGetters([
      'continents',
      'options',
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
        // The state has been updated and you can do whatever you want with the resp
        this.$store.dispatch('updateViewZoom', this.homeView.zoom);
        this.$store.dispatch('updateViewCenter', this.homeView.center);
        this.$store.dispatch('updateViewRotation', this.homeView.rotation);
      });
    },
  },
};
</script>

<style scoped>

</style>
