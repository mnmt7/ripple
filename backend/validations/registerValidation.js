const { body } = require('express-validator');

const User = require('../models/userModel');

module.exports = [
  body('username')
    .exists({ values: 'falsy' })
    .withMessage('Username is required')
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage(
      'Username must be minimum 5 characters long and maximum 15 characters long',
    )
    .isAlphanumeric()
    .withMessage('Username can only contain alphabets and numbers')
    .custom(async (username) => {
      const user = await User.findOne({ username });

      if (user) {
        throw new Error('Username already in use! Please use another one');
      }

      return true;
    }),

  body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .custom(async (email) => {
      const user = await User.findOne({ email });

      if (user) {
        throw new Error('Email already in use! Please use another one');
      }

      return true;
    }),
  body('password')
    .isStrongPassword()
    .withMessage(
      'Password must be minimum 8 characters long and must contain at least one lowercase character, uppercase character, number and symbol',
    ),
  body('passwordConfirm')
    .custom((passwordConfirm, { req }) => req.body.password === passwordConfirm)
    .withMessage('Password and PasswordConfirm must be same'),
];
