const router = require('express').Router();

const usersController = require('../controllers/users');
const errorHandler = require('../middlewares/errorHandler');

const usersValidators = require('../validators/usersValidators');

router.route('/refreshToken').post(usersController.refreshToken);
router.route('/login').post(usersValidators, usersController.login).all(errorHandler.methodNotAllowed);
router.route('/logOut').post(usersController.logOut).all(errorHandler.methodNotAllowed);
router.route('/register').post(usersValidators, usersController.register).all(errorHandler.methodNotAllowed);

module.exports = router;
