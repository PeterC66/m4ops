// cSpell:disable
const mongoose = require('mongoose');

const FeatureLayerSchema = new mongoose.Schema({
	_id: String,
	type: String,
	features: [{
    // These don't work - maybe because of duplicayed property name?
    // type: String,
    // geometry: {
    //   type: String,
    //   coordinates:  []
    // },
    // properties: {}
	}],
});

// parameters are name, schema, collection
const FeatureLayers = mongoose.model('FeatureLayer', FeatureLayerSchema, 'FeatureLayers');

module.exports = FeatureLayers;
