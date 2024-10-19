const { body } = require('express-validator');

module.exports = [
  body('email').isEmail().withMessage('Email is not valid'),
  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required'),
];
