const { body } = require('express-validator');

const toDoValidators = [body('title').notEmpty().isLength({ min: 2 }), body('is_complete').isBoolean()];

module.exports = toDoValidators;
