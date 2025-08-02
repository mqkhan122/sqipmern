
// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/adminController');
const { auth, checkRole } = require('../middleware/adminAuth');
const {createRole,getRoles} = require('../controllers/roleController')

router.post('/register', register);
router.post('/login', login);


router.get("/adminpage", auth, (req, res) => {
  res.status(200).json({ message: "Dashboard access granted", role: req.user.role });
});

router.post('/roles', createRole)
router.get('/roles', getRoles)



module.exports = router;

