const router = require('express').Router();

const toDoRoutes = require('./routes/toDoRoutes');
const usersRoutes = require('./routes/usersRoutes');

const { isAuthenticated } = require('./middlewares/authenticate');

router.use('/todos', isAuthenticated, toDoRoutes);
router.use('/users', usersRoutes);

module.exports = router;
