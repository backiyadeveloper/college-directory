const mongoose = require('mongoose');

const administratorProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photo: String,
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
});

module.exports = mongoose.model('AdministratorProfile', administratorProfileSchema);

