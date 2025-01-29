
const express = require('express')

const router = express.Router();

//import validate register
const {registerValidation} = require('../utils/authHelper');

// import register controller
const registerController = require('../controllers/RegisterController');

//  define routes
router.post('/register', registerValidation, registerController.userRegister);

module.exports = router;