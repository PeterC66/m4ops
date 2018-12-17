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
          "vl-geoloc",
          "vl-map",
          "vl-feature",
          "vl-overlay",
          "vl-view",
          "vl-layer-image",
          "vl-layer-tile",
          "vl-layer-vector",
          "vl-layer-vector-tile",
          "vl-source-bingmaps",
          "vl-source-image-static",
          "vl-source-image-wms",
          "vl-source-osm",
          "vl-source-sputnik",
          "vl-source-vector",
          "vl-source-vector-tile",
          "vl-source-wms",
          "vl-source-wmts",
          "vl-geom-point",
          "vl-geom-line-string",
          "vl-geom-polygon",
          "vl-geom-multi-point",
          "vl-geom-multi-line-string",
          "vl-geom-multi-polygon",
          "vl-geom-circle",
          "vl-interaction-draw",
          "vl-interaction-modify",
          "vl-interaction-select",
          "vl-interaction-snap",
          "vl-style-box",
          "vl-style-stroke",
          "vl-style-fill",
          "vl-style-circle",
        ]
      }]
  },
  parserOptions: {
    parser: "babel-eslint"
  },
};
