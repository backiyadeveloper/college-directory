const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FacultyProfile', required: true }
});

module.exports = mongoose.model('Course', courseSchema);
