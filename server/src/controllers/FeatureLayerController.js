const FeatureLayer = require('../models/FeatureLayer');

module.exports = {
  findByOps_Layer(ops_layer, callback) {
    const query = {};
    query['_id'] = ops_layer;
    
    FeatureLayer.findOne(query, (err, results) => {
    // console.log('In fBOL', err, result); // comments here cause error!
    if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },
};
