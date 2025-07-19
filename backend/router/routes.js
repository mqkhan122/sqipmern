const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');
const authAdmin = require('../middleware/adminAuth')

router.post('/adminlogin', adminLogin);

router.get("/adminpage", authAdmin, (req, res) => {
  res.json({ success: true, message: "Welcome Admin!" });
});

module.exports = router;
