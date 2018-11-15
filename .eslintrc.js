module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/recommended", "@vue/eslint-config-airbnb"],
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "linebreak-style": 0,
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "max-len": ["error", { "ignoreComments": true }],
    "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["moduleState"] }],
  },
  parserOptions: {
    parser: "babel-eslint"
  },
};
