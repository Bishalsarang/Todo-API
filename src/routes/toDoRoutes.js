const router = require('express').Router();

const toDoController = require('../controllers/toDo');

router.route('/').get(toDoController.search).post(toDoController.add);
module.exports = router;
