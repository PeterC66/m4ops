const Continent = require('../models/Continent');
const Place = require('../models/Place');
const M4OPSData = require('../models/M4OPSData');

module.exports = {

  findM4OPSData(params, callback) {
    M4OPSData.findOne(params, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },

  findPlaces(params, callback) {
    Place.find(params, '_id OPSCode	OPSName Protected', (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },

  findContinents(params, callback) {
    Continent.find(params, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },
/**
|--------------------------------------------------
| OLD Note
| Note that we need to return the whole Continent document that has the given opsCode
|  and dive into its sub-arrays here in js. Maybe 
| See https://www.devsbedevin.com/mongodb-find-findone-with-nested-array-filtering-finally/
|--------------------------------------------------
*/
  findByOpscode(opscode, callback) {
    const query = {};
    query['OPSCode'] = opscode;
    
    Place.findOne(query, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },
};
