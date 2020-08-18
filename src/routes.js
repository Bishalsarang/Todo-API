const router = require('express').Router();

const toDoRoutes = require('./routes/toDoRoutes');
const usersRoutes = require('./routes/usersRoutes');

const { isAuthenticated } = require('./middlewares/authenticate');
const { isAuthorized } = require('./middlewares/authorize');

router.use('/todos', isAuthenticated, isAuthorized, toDoRoutes);
router.use('/users', usersRoutes);

module.exports = router;
