const express = require('express')
const route = express.Router()
const {adminlogin} = require('../controller/adminController')

route.post('/login',adminlogin)

module.exports = route