const express = require('express');
const router = express.Router();

// Import validation functions
const { registerValidation, loginValidation } = require('../utils/authHelper');

// Import verify token middleware
const {verifyToken}  = require('../middleware/auth');

// Import controllers
const registerController = require('../controllers/RegisterController');
const loginController = require('../controllers/LoginController');
const userController = require('../controllers/UserController');


// Define routes
router.post('/register', registerValidation, registerController.userRegister);
router.post('/login', loginValidation, loginController.userLogin);
router.get('/admin/users',verifyToken, userController.findUsers);

module.exports = router;