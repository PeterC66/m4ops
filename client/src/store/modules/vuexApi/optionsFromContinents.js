/* eslint-disable arrow-body-style */

const optionsFromContinents = (continents, places) => {
  const options = !continents ? [] : continents
    .filter(continent => (continent.M4OPS))
    .map(continent => (
      {
        value: continent.continent,
        label: continent.continent,
        children: continent.countryArray
          .filter(country => (country.M4OPS))
          .map(country => (
            {
              value: country.country,
              label: country.country,
              children: country.locationArray
                .filter(location => (location.M4OPS))
                .map(location => (
                  {
                    value: location.location,
                    label: location.location,
                    children: location.studyArray
                      .filter(study => (study.opsCode))
                      .map(study => (
                        {
                          value: study.opsCode,
                          label: `${study.opsCode} ${study.studyArea}`,
                        }
                      )),
                  }
                )),
            }
          )),
      }
    ));
  // Create one 'continent' containing all the known OPS
  const allOps = !places ? [] : places
    .map(place => ({
      value: place.OPSCode,
      label: `${place.OPSCode} ${place.OPSName}`,
    }));
  allOps.sort((a, b) => {
    const x = a.label.toLowerCase().split(' ')[1];
    const y = b.label.toLowerCase().split(' ')[1];
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
  const allOpsOption = {
    value: 'allOps',
    label: 'All OPS',
    children: [{
      value: 'allOps',
      label: 'All OPS',
      children: [{
        value: 'allOps',
        label: 'All OPS',
        children: allOps,
      }],
    }],
  };
  options.push(allOpsOption);

  return options;
};

export default optionsFromContinents;
