const pool = require('../db');
const logger = require('../utils/logger');

/**
 * Search todos : If a query q is present, a case-insensitive search is made on database.
 * Else all the rows are returned.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const search = async (req, res, next) => {
  const searchQuery = req.query['q'];

  const sqlQuery = searchQuery ? 'SELECT * FROM todos WHERE LOWER(title) LIKE $1' : 'SELECT * FROM todos';
  const values = searchQuery ? ['%' + searchQuery.toLowerCase() + '%'] : [];

  try {
    const result = await pool.query(sqlQuery, values);

    res.json({ success: true, rows: result.rows });
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

/**
 * Add todo.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const add = async (req, res, next) => {
  const sqlQuery = 'INSERT INTO todos(title, is_complete) VALUES($1, $2)';
  const { title, is_complete: isComplete } = req.body;
  const values = [title, isComplete];

  try {
    await pool.query(sqlQuery, values);
  } catch (err) {
    next(err);
    logger.error(err);
  }
  res.json({ success: true });
};

const readToDo = async (req, res, next) => {
  const sqlQuery = 'SELECT * FROM todos where todo_id=$1';
  const values = [req.params.id];

  try {
    const result = await pool.query(sqlQuery, values);

    res.json({ success: true, row: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

const deleteToDo = async (req, res, next) => {
  const sqlQuery = 'DELETE FROM todos where todo_id=$1';
  const values = [req.params.id];

  try {
    await pool.query(sqlQuery, values);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

const updateToDo = async (req, res, next) => {
  const sqlQuery = 'UPDATE todos SET title=$1, is_complete=$2 WHERE todo_id=$3';

  const { title, is_complete: isComplete } = req.body;

  const values = [title, isComplete, req.params.id];

  try {
    await pool.query(sqlQuery, values);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
  search,
  readToDo,
  deleteToDo,
  updateToDo,
};
