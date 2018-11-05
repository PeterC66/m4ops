/*
export default function layerCollectionFromDef(LayerDefs, sdef) {
  const layerCollection = new OlCollection();
  // ignore attribution (NA), min/maxZoom (?)
  if (sdef.url) { // should be a string array of layers
    const layerTitles = getLayerTitles(sdef.url);
    layerTitles.forEach((layerTitle) => {
      const ldindex = indexOfArrayM4(LayerDefs, layerTitle, 'title');
      if (ldindex > -1) {
        layerCollection.push(layerFromDef(ldindex)); // eslint-disable-line no-use-before-define
      } else {
        console.log(`Cannot find Layer ${layerTitle}`); // eslint-disable-line no-console
      }
    });
    return layerCollection;
  }
  console.log(sdef, ' has no string array of layers'); // eslint-disable-line no-console
  return null;
}
*/
