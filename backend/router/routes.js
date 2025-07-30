
// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/adminController');
const { auth, checkRole } = require('../middleware/adminAuth');

router.post('/register', register);
router.post('/login', login);


router.get("/adminpage", auth, (req, res) => {
  res.status(200).json({ message: "Dashboard access granted", role: req.user.role });
});



module.exports = router;

