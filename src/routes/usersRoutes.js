const router = require('express').Router();

const usersController = require('../controllers/users');
const errorHandler = require('../middlewares/errorHandler');

router.route('/refreshToken').post(usersController.refreshToken);
router.route('/login').post(usersController.login).all(errorHandler.methodNotAllowed);
router.route('/logOut').post(usersController.logOut).all(errorHandler.methodNotAllowed);
router.route('/register').post(usersController.register).all(errorHandler.methodNotAllowed);

module.exports = router;
