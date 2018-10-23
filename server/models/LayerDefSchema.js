// cSpell:disable
const mongoose = require('mongoose');

// As a subschema this does not need converting into a Model
const LayerDefSchema = new mongoose.Schema({
  layertype: String,
  category: String,
  title: String,
  donotshow: String,
  csvname: String,
  candownload: String,
  ldid: String,
  folder: String,
  storageName: String,
  mapkey: String,
  tilePixelRatio: Number,
  date: Number,
  layerdescription: String,
  sourcedef:{
    url: String,
    attribution: String,
    minZoom: Number,
    maxZoom: Number,
    proj3857D: String,
    projection: String,
  },
  extent: [Number],
  equivalencies:{
    shorttext: String,
    description: String,
    fl_col2: String,
    textforsort: String,
  },
  Specification:{
    fl_Ncols: Number,
    flhead_col1: String,
    flhead_col2: String,
    flhead_col3: String,
  }
});

module.exports = LayerDefSchema;
