const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photo: String,
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  year: String
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
