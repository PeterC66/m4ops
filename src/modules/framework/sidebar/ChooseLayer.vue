<template>
  <div class="block">
    <el-cascader
      :options="options"
      :show-all-levels="false"
      v-model="selectedOption"
      expand-trigger="hover"
      @change="handleChange(selectedOption)"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import LayersContainer from './LayersContainer.vue';

export default {
  name: 'ChooseLayer',
  components: {
    // LayersContainer,
  },
  props: {
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
        this.$store.dispatch('updateView', this.homeView);
      });
    },
  },
};
</script>

<style>

</style>

<!--

function displayRender(label) {
  return (label.join(' / '));
}
function calcDefaultOption(ldId) {
  if (!ldId) return [];
  const idArray = ldId.split('>');
  return [idArray[1].replace('_', ' '), ldId];
}

export default function ChooseLayer(props) {
  const { options, onSelectLayer, ldId } = props;
  const onChange = (value) => {
    onSelectLayer(value[value.length - 1]);
  };

  const defaultOption = calcDefaultOption(ldId);

  return (
    <Fragment>
      <Cascader
        options={options}
        defaultValue={defaultOption}
        expandTrigger="hover"
        displayRender={displayRender}
        onChange={onChange}
        size="small"
        style={{ width: 300 }}
      />
    </Fragment>
  );
}


const { array, func, string } = PropTypes;

ChooseLayer.propTypes = {
  options: array.isRequired, // eslint-disable-line react/forbid-prop-types
  onSelectLayer: func.isRequired,
  ldId: string.isRequired,
};
-->
