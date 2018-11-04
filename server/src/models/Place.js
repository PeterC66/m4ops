// cSpell:disable
const mongoose = require('mongoose');
const LayerDefSchema = require('./LayerDefSchema');

const PlaceSchema = new mongoose.Schema({
	OPSCode: String,
	OPSName: String,
	OPSDescription: String,
	ContactEmail: String,
	Website: String,
	Area: String,
	Lon: Number,
	Lat: Number,
	Zoom: Number,
	nFeatureLayers: Number,
	password: String,
	minYearBound: Number,
	minYear: Number,
	maxYear: Number,
	SOPSpage: String,
	SOPSName: String,
	TopLeft: [Number],
	BottomRight: [Number],
	LayerDefsArray:[LayerDefSchema],
	MFLFieldSpecsArray: [{
		MFSid: String,
		MFSname: String,
		FieldArray:[{
			fieldname: String,
			fieldtype: String,
			label: String,
			placeholder: String,
			tooltip: String,
			required: Boolean,
			description: String,
			comment: String,
		}],
	}],
	ColoursArray: [{
		csid: String,
		title: String,
		CEArray:[{
			keytitle: String,
			fproperty: String,
			comparetype: String,
			comparevalue: String,
			keyphrase: String,
			colour: String,
			comment: String,
		}],
	}],
	AbbreviationsArray: [{
		abbcode: String,
		abbhtml: String,
	}],
	ExclusionsArray: [{
		category: String,
		title: String,
	}],
	ProjectionsArray: [{
		projName: String,
		shiftEastM: Number,
		shiftNorthM: Number,
	}],
});

// parameters are name, schema, collection
const Places = mongoose.model('Place', PlaceSchema, 'Places');

module.exports = Places;
