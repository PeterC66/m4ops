<template>
  <div>
    {layersList}
    {blankOnEnd}
  </div>
</template>

<script>
// import LayersContainer from './LayersContainer.vue';

export default {
  name: 'LayersContainer',
  components: {
    // LayersContainer,
  },
  props: {
  },
};
</script>

<style>

</style>

<!--

import { getChosenLayersFromMap } from '../../mapping';
import ChooseLayerContainer from './ChooseLayerContainer';
import { maxChooseLayers } from '../../../global/constants';

/* eslint-disable react/jsx-filename-extension */
function ItemList(props) {
  const { numbers } = props;
  const listItems = numbers.map(
    number => <ChooseLayerContainer layerNumber={number} key={cuid()} />,
  );
  return (
    <div>{listItems}</div>
  );
}
/* eslint-enable react/jsx-filename-extension */

// Cannot be a Pure component to be Mappified!
/* eslint-disable react/prefer-stateless-function */
class LayersContainer extends Component {
  render() {
    const { map } = this.props;
    const chosenLayers = getChosenLayersFromMap(map);
    let layersList = '';
    let blankToShow = 0;
    if (chosenLayers) {
      layersList = chosenLayers.map(
        (layer, index) => (
          <ChooseLayerContainer
            layerNumber={index}
            key={layer.ldId}
            ldId={layer.ldId}
          />
        ),
      );
      blankToShow = chosenLayers.length;
    }
    let blankOnEnd = <ChooseLayerContainer layerNumber={blankToShow} key={cuid()} />;
    if (blankToShow >= maxChooseLayers) blankOnEnd = '';
    console.log('LayersContainer', chosenLayers, this.props, 'layersList', layersList, blankToShow, 'blankOnEnd', blankOnEnd);

    return (
      /* eslint-disable react/jsx-filename-extension */
      <div>
        {layersList}
        {blankOnEnd}
      </div>
      /* eslint-enable react/jsx-filename-extension */
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

const {
  array,
  object,
} = PropTypes;

ItemList.propTypes = {
  numbers: array.isRequired, // eslint-disable-line react/forbid-prop-types
};

LayersContainer.propTypes = {
  map: object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default LayersContainer;
-->
