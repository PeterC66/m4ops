const optionsDefaults = {};

export default {
  install(vue, opts) {
    console.log('Installing the globalPlugin1 plugin!');

    const options = { ...optionsDefaults, ...opts };
  },
};

