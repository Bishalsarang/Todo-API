const router = require('express').Router();

const toDoController = require('../controllers/toDo');

router.get('/', toDoController.fetchAll);

module.exports = router;
