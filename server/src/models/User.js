const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rightsArray: [{
    userRight: { type: String, required: true },
    opsCode: { type: String, required: false },
  }],
  createdDate: { type: Date, default: Date.now }
});

UserSchema.set('toJSON', { virtuals: true });

// parameters are name, schema, collection
const Users = mongoose.model('User', UserSchema, 'Users');

module.exports = Users;
