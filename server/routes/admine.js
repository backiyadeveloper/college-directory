const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const StudentProfile = require('../models/StudentProfile');
const FacultyProfile = require('../models/FacultyProfile');
const AdministratorProfile = require('../models/AdministratorProfile');
const router = express.Router();

// CRUD operations for Student and Faculty Records
router.post('/create-user', auth, async (req, res) => {
  const { username, password, role, name, email, phone, department_id, year, office_hours, photo } = req.body;

  try {
    let user = new User({ username, password, role, name, email, phone });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    if (role === 'STUDENT') {
      let studentProfile = new StudentProfile({ user_id: user._id, department_id, year, photo });
      await studentProfile.save();
    } else if (role === 'FACULTY_MEMBER') {
      let facultyProfile = new FacultyProfile({ user_id: user._id, department_id, office_hours, photo });
      await facultyProfile.save();
    } else if (role === 'ADMINISTRATOR') {
      let adminProfile = new AdministratorProfile({ user_id: user._id, department_id, photo });
      await adminProfile.save();
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
