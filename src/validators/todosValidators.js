const { body } = require('express-validator');

const toDoValidators = [
  body('title').not().isEmpty().trim().escape().withMessage('Title Should be valid'),
  body('is_complete').not().isEmpty().trim().escape(),
];

module.exports = toDoValidators;
