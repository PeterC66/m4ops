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
    "vue/component-name-in-template-casing": ["error", "PascalCase", { 
        "ignores": [
          "anchored-heading",
          "font-awesome-icon",
          "b-dropdown",
          "b-dropdown-item",
          "b-icon",
          "b-tabs",
          "b-tab-item",
          "router-link",
          "router-view",
        ]
      }]
  },
  parserOptions: {
    parser: "babel-eslint"
  },
};
