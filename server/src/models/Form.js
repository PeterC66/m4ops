const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
	_id: String,
	vfg_model: {},
	vfg_schema: {
    fields: [
      {},
    ],
  },
  vfg_formOptions: {},
});

const Forms = mongoose.model('Form', FormSchema, 'Forms');

module.exports = Forms;
