const mongoose = require('mongoose');
const LayerDefSchema = require('./LayerDefSchema');


const M4OPSDataSchema = new mongoose.Schema({
  WorldLayerDefsArray:[LayerDefSchema],
  DefinedLayerDefsArray:[LayerDefSchema],
  AreasArray:[{
    AreaCode:String,
    AreaName:String,
    AreaLayerDefs:[String],
    NoLongerUsed:[String],
    LayerDefsArray:[LayerDefSchema],
  }],
  TextConversionsArray:[{
    abbcode:String,
    abbhtml:String,
    abbplain:String,
    comment:String,
  }],
  AbbreviationsArray:[{
    abbcode:String,
    abbhtml:String,
    comment:String,
  }],
  toAbbreviateArray:[{
    abblong:String,
    abbshort:String,
    comment:String,
  }],
  DefaultColourSetsArray:[{
    csname:String,
    pointRGB:String,
    lineRGB:String,
    polygonRGB:String,
    geometrycollectionRGB:String,
    multilineRGB:String,
    multipolygonRGB:String,
    description:String,
    comment:String,
  }],
  HelpHTML:String,
  showlevels:[{
    cutoffpoint:Number,
    commentForPDCUse:String,
    addparams:String,
    explanation:String,
  }],
  demoSections:[{
    demsecCode:String,
    demsecOrder:Number,
    title:String,
    description:String,
    firstCOP:Number,
  }],
});

const M4OPSData = mongoose.model('M4OPSData', M4OPSDataSchema, 'M4OPSData');

module.exports = M4OPSData;
