const FeatureLayer = require('../models/FeatureLayer');

module.exports = {
  findByOps_Layer(ops_layer, callback) {
    const query = {};
    query['_id'] = ops_layer;
    
    FeatureLayer.findOne(query, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },
};
