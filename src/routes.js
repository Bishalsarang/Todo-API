const router = require('express').Router();

const toDoRoutes = require('./routes/toDoRoutes');

router.use('/todos', toDoRoutes);

module.exports = router;
