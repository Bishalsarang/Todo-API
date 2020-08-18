const { body } = require('express-validator');

const usersValidators = [
  body('email').isEmail().normalizeEmail().withMessage('It should be a valid email'),
  body('name').not().isEmpty().trim().escape(),
  body('password').isLength({ min: 8 }).withMessage('At least 8 minimum characters'),
];

module.exports = usersValidators;
