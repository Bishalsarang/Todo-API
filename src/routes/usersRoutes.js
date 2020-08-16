const router = require('express').Router();

const usersController = require('../controllers/users');

router.route('/register').post(usersController.register);
module.exports = router;
