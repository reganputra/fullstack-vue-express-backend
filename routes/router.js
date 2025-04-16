const express = require('express');
const router = express.Router();


const { registerValidation, loginValidation } = require('../utils/authHelper');
const {userValidation} = require("../utils/userHelper");


const {verifyToken}  = require('../middleware/auth');


const registerController = require('../controllers/RegisterController');
const loginController = require('../controllers/LoginController');
const userController = require('../controllers/UserController');



// Define routes
router.post('/register', registerValidation, registerController.userRegister);
router.post('/login', loginValidation, loginController.userLogin);
router.get('/admin/users',verifyToken, userController.findUsers);
router.post('/admin/users',verifyToken, userValidation ,userController.createUser);
router.get('/admin/users/:id',verifyToken, userValidation ,userController.getUserById);
router.put('/admin/users/:id', verifyToken, userValidation, userController.updateUser);
router.delete('/admin/users/:id', verifyToken, userController.destroyUser);

module.exports = router;