<template>
  <div
    id="buttonsL1">
    <b-dropdown>
      <button
        slot="trigger"
        class="button is-primary is-small">
        <span>Choose a One-Place Study</span>
        <b-icon icon="menu-down"/>
      </button>

      <b-dropdown-item
        custom
        paddingless>
        <ChooseOPS/>
        <p>
          Select the Continent, Country, County (eg), Study Area.
        </p>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import ChooseOPS from './ChooseOPS.vue';

export default {
  name: 'HeaderL1',
  components: {
    ChooseOPS,
  },
};
</script>

<style scoped lang="scss">
</style>
