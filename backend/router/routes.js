// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/adminController');
const auth = require('../middleware/adminAuth');

router.post('/register', register);
router.post('/login', login);

// ✅ Common Dashboard Route
router.get('/adminpage', auth, (req, res) => {
  res.json({
    success: true,
    message: `Welcome ${req.user.role}!`,
    role: req.user.role
  });
});

module.exports = router;
