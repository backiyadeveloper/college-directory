const express = require('express');
const auth = require('../middleware/auth');
const StudentProfile = require('../models/StudentProfile');
const User = require('../models/user');
const router = express.Router();

// Get Student Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user_id: req.user.id }).populate('user_id');
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Search for Students
router.get('/search', auth, async (req, res) => {
  const { name, department, year } = req.query;
  const query = {};

  if (name) query.name = new RegExp(name, 'i');
  if (department) query.department_id = department;
  if (year) query.year = year;

  try {
    const students = await StudentProfile.find(query).populate('user_id');
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
