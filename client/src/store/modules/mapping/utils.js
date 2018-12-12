import _ from 'lodash';

import { isVoid } from '../../../global/utils';

export const tidyChosenLayers = chosenLayers => _.sortBy(
  _.filter(
    chosenLayers,
    value => !isVoid(value.ldid),
  ),
  'displaytype',
);

export const dummy = 0;
