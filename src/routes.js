const router = require('express').Router();

const toDoRoutes = require('./routes/toDoRoutes');
const usersRoutes = require('./routes/usersRoutes');

router.use('/todos', toDoRoutes);
router.use('/users', usersRoutes);

module.exports = router;
