const optionsFromContinents = (continents) => {
  console.log('OFC', continents);
  return !continents ? [] : continents
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
};

export default optionsFromContinents;
