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

const addToDo = async ({ title, isComplete }) => {
  const id = uuid();

  // console.log('Helllo id', uuid());
  const sqlQuery = 'INSERT INTO todos(id, title, isComplete) VALUES($1, $2, $3)';

  const values = [id, title, isComplete];

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

const updateToDo = async ({ title, isComplete, id }) => {
  const sqlQuery = 'UPDATE todos SET title=$1, isComplete=$2 WHERE id=$3';
  const values = [title, isComplete, id];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    return null;
  }
};

module.exports = { getToDos, addToDo, updateToDo, readToDo, deleteToDo };
