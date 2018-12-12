module.exports = {
  devServer: {
    // proxy: 'http://localhost:5000',
    proxy: process.env.VUE_APP_BACKEND_URL,
  },

  lintOnSave: false,
};
