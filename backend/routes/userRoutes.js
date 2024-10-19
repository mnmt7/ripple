const express = require('express');

const authController = require('../controllers/authController');
// const userController = require('../controllers/userController');
const registerValidation = require('../validations/registerValidation');
const validate = require('../validations/validate');
const loginValidation = require('../validations/loginValidation');

const router = express.Router();

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);

router.use(authController.protect);
// router.get('/me', userController.getMe);

module.exports = router;
