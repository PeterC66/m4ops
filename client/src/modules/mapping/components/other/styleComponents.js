export function createVlStyleCircle(createElement, options) {
  const { radius = 4, circleColor = 'red' } = options;
  return createElement(
    'vl-style-circle',
    {
      props: {
        radius,
      },
    },
    [
      createElement('vl-style-stroke', {
        props: {
          color: circleColor,
        },
      }),
      createElement('vl-style-fill', {
        props: {
          color: circleColor,
        },
      }),
    ],
  );
}

export function createVlStyleBox(createElement, options) {
  const {
    strokeColor = 'blue', fillColor = 'blue', radius = 4, circleColor = 'red',
  } = options;

  return createElement(
    'vl-style-box',
    [
      createElement('vl-style-stroke', {
        props: {
          color: strokeColor,
        },
      }),
      createElement('vl-style-fill', {
        props: {
          color: fillColor,
        },
      }),
      createVlStyleCircle(createElement, { radius, circleColor }),
    ],
  );
}
