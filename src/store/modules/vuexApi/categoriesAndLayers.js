import _ from 'lodash';

import {
  pipe,
  string2bool,
} from '../../../global/utils';

/**
 *--------------------------------------------------
 * getCategoriesAndLayers takes an array of LayerDefs and returns a two level array
 * of Layers within Categories, to be the options object (array) for a cascader.
 * Only layers of given types are included, and any with donotshow set to TRUE are excluded.
 *--------------------------------------------------
 */
const layertypesGiven = [
  'Tile',
  'VectorTile',
  'WMS',
  'WMTS',
  'Group',
  'Series',
  'Vector',
];

const extractCategories = pipe(
  arr => arr.filter(ld => (ld ? !string2bool(ld.donotshow, false) : false)),
  arr => arr.filter(ld => (ld ? (layertypesGiven.indexOf(ld.layertype) !== -1) : false)), // eslint-disable-line max-len
  arr => _.uniqBy(arr, 'category'),
);

const categoriesAndLayers = (lds) => {
  if (!lds) return [];
  const categories = extractCategories(lds);

  return categories.map(cat => ({
    value: cat.category,
    label: cat.category,
    children: _.filter(lds, { category: cat.category })
      .filter(ld => !string2bool(ld.donotshow, false))
      .map(ld => ({
        value: ld.ldid,
        label: ld.title,
      })),
  }));
};

export default categoriesAndLayers;
