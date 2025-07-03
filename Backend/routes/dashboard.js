const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// User dashboard (protected, user only)
router.get('/user', auth('user'), (req, res) => {
  res.json({ msg: `Welcome to the user dashboard, user ID: ${req.user.id || req.user.email}` });
});

// Admin dashboard (protected, admin only)
router.get('/admin', auth('admin'), (req, res) => {
  res.json({ msg: `Welcome to the admin dashboard, admin email: ${req.user.email}` });
});

module.exports = router; 