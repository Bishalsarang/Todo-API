const router = require('express').Router();

const usersController = require('../controllers/users');
const errorHandler = require('../middlewares/errorHandler');

router.route('/register').post(usersController.register).all(errorHandler.methodNotAllowed);
router.route('/login').post(usersController.login).all(errorHandler.methodNotAllowed);
router.route('/refreshToken').post(usersController.refreshToken);
module.exports = router;
