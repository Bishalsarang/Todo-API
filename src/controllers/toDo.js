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

  const sqlQuery = searchQuery ? 'SELECT * from todos where LOWER(title) LIKE $1' : 'SELECT * from todos';
  const values = searchQuery ? ['%' + searchQuery.toLowerCase() + '%'] : [];

  try {
    const result = await pool.query(sqlQuery, values);

    res.json(result.rows);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

/**
 * Add todo.
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const add = (req, res, next) => {
  try {
    //  console.log('ssss');
  } catch (err) {
    logger.error(err);
  }
  res.json({ message: 'hee' });
};

module.exports = { search, add };
