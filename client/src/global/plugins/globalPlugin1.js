const optionsDefaults = {};

export default {
  install(vue, opts) {
    console.log('Installing the globalPlugin1 plugin!'); // eslint-disable-line no-console

    // eslint-disable-next-line no-unused-vars
    const options = { ...optionsDefaults, ...opts };
  },
};
