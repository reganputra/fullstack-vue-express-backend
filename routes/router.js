
const express = require('express')

const router = express.Router();

//import validate register
const {registerValidation, loginValidation} = require('../utils/authHelper');

// register and login controller
const registerController = require('../controllers/RegisterController');
const loginController = require('../controllers/LoginController');

//  define routes
router.post('/register', registerValidation, registerController.userRegister);
router.post('/login', loginValidation, loginController.userLogin);

module.exports = router;