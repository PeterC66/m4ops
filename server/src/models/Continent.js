const mongoose = require('mongoose');


const ContinentSchema = new mongoose.Schema({
  continent: String,
  M4OPS: Boolean,
  countryArray: [{
    country: String,
    M4OPS: Boolean,
    locationArray: [{
      location: String,
      M4OPS: Boolean,
      studyArray: [{
        givenName: String,
        surname: String,
        studyArea: String,
        comments: String,
        website: String,
        opsCode: String,
      }],
    }],
  }],
});


const Continents = mongoose.model('Continent', ContinentSchema, 'Continents');

module.exports = Continents;
