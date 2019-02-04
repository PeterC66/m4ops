const Form = require('../models/Form');

module.exports = {

  findForms(params, callback) {
    Form.find(params, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },

  findFormById(id, callback) {
    Form.findById(id, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  },
};
