
// cSpell:disable
/* eslint-disable max-len */
export const bingApiKey = 'MHa7q07ui9757RJld6va~1IPp2elvmkSrGFA7QPrs6A~Aj0hERxm42UIVtGh9CbZ_tpVlvwWKQ4wRL5fk5eg57BWzxXaU9-Al1dsbfXl804y';
/* eslint-enable max-len */
// cSpell:enable

// NOTE that ldid is treated as one word because otherwise of case issues
export const ldidOSM = 'World>Basic>OpenStreetMap';
export const ldidBingAerial = 'World>Basic>Bing_Aerial';

export const bingImagerySets = [
  'Aerial',
  'AerialWithLabelsOnDemand',
  'OrdnanceSurvey',
  'RoadOnDemand',
];

/* from https://msdn.microsoft.com/en-us/library/ff701716.aspx
- Aerial: Aerial imagery.

- AerialWithLabels (Deprecated): Aerial imagery with a road overlay, using the legacy static tile service. This service is deprecated and current data will not be refreshed. New applications should instead use AerialWithLabelsOnDemand.

- AerialWithLabelsOnDemand: Aerial imagery with a road overlay, using the dynamic tile service.

- Birdseye: Bird’s eye (oblique-angle) imagery.

- BirdseyeWithLabels: Bird’s eye imagery with a road overlay.

- BirdseyeV2: The second generation Bird’s eye (oblique-angle) imagery.

- BirdseyeV2WithLabels: The second generation Bird’s eye (oblique-angle) imagerywith a road overlay.

- CanvasDark: A dark version of the road maps.

- CanvasLight: A lighter version of the road maps which also has some of the details such as hill shading disabled.

- CanvasGray: A grayscale version of the road maps.

- OrdnanceSurvey: Ordnance Survey imagery. This imagery is visible only for the London area.

- Road (Deprecated): Roads without additional imagery, using the legacy static tile service. This service is deprecated and current data will not be refreshed. New applications should instead use RoadOnDemand.

- RoadOnDemand: Roads without additional imagery, using the dynamic tile service.

- Streetside: Street-level Imagery.

 Example: imagerySet=Aerial
 */
