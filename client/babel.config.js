module.exports = {
  presets: [
    [
      '@vue/babel-preset-app',
      {
        useBuiltIns: 'entry',
      },
    ],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
};
