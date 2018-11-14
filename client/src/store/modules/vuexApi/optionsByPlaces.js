/* eslint-disable arrow-body-style */
import _ from 'lodash';

import { isNonemptyArray } from '../../../global/utils';

const optionsByPlaces = (continents, places) => {
  const options = [];
  if (isNonemptyArray(continents)) {
    continents
      .forEach((continent) => {
        if (continent.M4OPS) {
          if (isNonemptyArray(continent.countryArray)) {
            continent.countryArray
              .forEach((country) => {
                if (country.M4OPS) {
                  if (isNonemptyArray(country.locationArray)) {
                    country.locationArray
                      .forEach((location) => {
                        if (location.M4OPS) {
                          if (isNonemptyArray(location.studyArray)) {
                            location.studyArray
                              .forEach((study) => {
                                // eslint-disable-next-line keyword-spacing
                                if(study.opsCode) {
                                  options.push([
                                    continent.continent,
                                    country.country,
                                    location.location,
                                    study.opsCode,
                                  ]);
                                }
                              });
                          }
                        }
                      });
                  }
                }
              });
          }
        }
      });
  }
  console.log('A', options); // eslint-disable-line no-console

  const opsCodes =
    options
      .map(option => (option[3]));
  console.log('C', opsCodes); // eslint-disable-line no-console
  console.log('D', places); // eslint-disable-line no-console

  const allOtherOps = [];
  if (isNonemptyArray(places)) {
    places
      .forEach(place => allOtherOps.push(place.OPSCode));
  }
  console.log('E', allOtherOps); // eslint-disable-line no-console

  allOtherOps
    .filter(opsCode => !(_.includes(opsCodes, opsCode)))
    .forEach((opsCode) => {
      options.push([
        'allOps',
        'allOps',
        'allOps',
        opsCode,
      ]);
    });

  console.log('Z', options); // eslint-disable-line no-console
  return options;
};

export default optionsByPlaces;
