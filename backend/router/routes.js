const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');

router.post('/adminlogin', adminLogin);

module.exports = router;
