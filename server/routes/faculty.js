const express = require('express');
const auth = require('../middleware/auth');
const FacultyProfile = require('../models/FacultyProfile');
const User = require('../models/user');
const router = express.Router();

// Get Faculty Class List
router.get('/class-list', auth, async (req, res) => {
  try {
    const classes = await FacultyProfile.find({ user_id: req.user.id }).populate('user_id');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update Faculty Profile
router.put('/profile', auth, async (req, res) => {
  const { office_hours, email, phone } = req.body;

  try {
    let profile = await FacultyProfile.findOne({ user_id: req.user.id });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    profile.office_hours = office_hours;
    await profile.save();

    const user = await User.findById(req.user.id);
    user.email = email;
    user.phone = phone;
    await user.save();

    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
