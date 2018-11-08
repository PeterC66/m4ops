<template>
  <div
    id="buttonsL1">
    <b-tooltip
      label="Choose a One-Place Study"
      position="is-right">
      <b-collapse
        v-model="openValue">
        <button
          slot="trigger"
          class="button is-primary">
          <span class="icon">
            <font-awesome-icon icon="chevron-circle-down"/>
          </span>
        </button>
        <div class="notification">
          <div class="content">
            <ChooseOPS/>
            <p>
              Select the Continent, Country, County (eg), Study Area.
            </p>
          </div>
        </div>
      </b-collapse>
    </b-tooltip>
  </div>
</template>

<script>
import ChooseOPS from './ChooseOPS.vue';

export default {
  name: 'HeaderL1',
  components: {
    ChooseOPS,
  },
  props: {
    opsdetails: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      openValue: false,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
