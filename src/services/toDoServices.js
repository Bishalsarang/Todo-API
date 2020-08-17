const { v4: uuid } = require('uuid');

const pool = require('../db');

const getToDos = async (searchQuery) => {
  const sqlQuery = searchQuery ? 'SELECT * FROM todos WHERE LOWER(title) LIKE $1' : 'SELECT * FROM todos';
  const values = searchQuery ? ['%' + searchQuery.toLowerCase() + '%'] : [];

  try {
    const result = await pool.query(sqlQuery, values);

    return result.rows;
  } catch (err) {
    return null;
  }
};

const addToDo = async ({ title, is_complete: isComplete, id }) => {
  const sqlQuery = 'INSERT INTO todos(id, title, is_complete) VALUES($1, $2, $3)';

  const values = [id || uuid(), title, isComplete];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    return null;
  }
};

const readToDo = async ({ id }) => {
  const sqlQuery = 'SELECT * FROM todos where id=$1';
  const values = [id];

  try {
    const result = await pool.query(sqlQuery, values);

    return result.rows[0];
  } catch (err) {
    return null;
  }
};

const deleteToDo = async ({ id }) => {
  const sqlQuery = 'DELETE FROM todos where id=$1';
  const values = [id];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    return null;
  }
};

const updateToDo = async ({ title, is_complete: isComplete, priority, id }) => {
  const sqlQuery = 'UPDATE todos SET title=$1, is_complete=$2, priority=$3 WHERE id=$4';
  const values = [title, isComplete, priority, id];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    return null;
  }
};

module.exports = { getToDos, addToDo, updateToDo, readToDo, deleteToDo };
