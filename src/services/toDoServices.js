const { v4: uuid } = require('uuid');

const pool = require('../db');

const emptyToDo = async () => {
  const sqlQuery = 'DELETE from todos';

  try {
    await pool.query(sqlQuery);
  } catch (err) {
    console.error(err);

    return null;
  }
};

const getToDos = async (searchQuery, userEmail) => {
  const sqlQuery = searchQuery
    ? 'SELECT * FROM todos WHERE user_email=$1 AND LOWER(title) LIKE $2'
    : 'SELECT * FROM todos WHERE user_email=$1';
  const values = searchQuery ? [userEmail, '%' + searchQuery.toLowerCase() + '%'] : [userEmail];

  try {
    const result = await pool.query(sqlQuery, values);

    return result.rows;
  } catch (err) {
    console.error(err);

    return null;
  }
};

const addToDo = async ({ title, is_complete: isComplete, id, user_email: userEmail }) => {
  const sqlQuery = 'INSERT INTO todos(id, title, is_complete, user_email) VALUES($1, $2, $3, $4)';

  const values = [id || uuid(), title, isComplete, userEmail];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    console.error(err);

    return null;
  }
};

const readToDo = async ({ id, user_email: userEmail }) => {
  const sqlQuery = 'SELECT * FROM todos where user_email=$1 AND id=$2';
  const values = [userEmail, id];

  try {
    const result = await pool.query(sqlQuery, values);

    if (!result.rows.length) {
      const err = new Error('Requested id not found');

      err.status = 404;
      throw err;
    }

    return result.rows[0];
  } catch (err) {
    return null;
  }
};

const deleteToDo = async ({ id, user_email: userEmail }) => {
  const sqlQuery = 'DELETE FROM todos where user_email=$1 AND id=$2';
  const values = [userEmail, id];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    console.error(err);

    return null;
  }
};

const updateToDo = async ({ title, is_complete: isComplete, priority, id, user_email: userEmail }) => {
  const sqlQuery = 'UPDATE todos SET title=$1, is_complete=$2, priority=$3 WHERE id=$4 AND user_email=$5';
  const values = [title, isComplete, priority, id, userEmail];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    console.error(err);

    return null;
  }
};

module.exports = { getToDos, addToDo, updateToDo, readToDo, deleteToDo, emptyToDo };
