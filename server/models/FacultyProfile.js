const mongoose = require('mongoose');

const facultyProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photo: String,
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  office_hours: String
});

module.exports = mongoose.model('FacultyProfile', facultyProfileSchema);
