const router = require('express').Router();

const toDoController = require('../controllers/toDo');
const errorHandler = require('../middlewares/errorHandler');

router.route('/').get(toDoController.search).post(toDoController.add).all(errorHandler.methodNotAllowed);

router
  .route('/:id') //
  .get(toDoController.read) // Read
  .put(toDoController.update) // Update
  .delete(toDoController.del) // Delete
  .all(errorHandler.methodNotAllowed);

module.exports = router;
