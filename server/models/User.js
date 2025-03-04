const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['STUDENT', 'FACULTY_MEMBER', 'ADMINISTRATOR'], required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String }
});

module.exports = mongoose.model('User', userSchema);
