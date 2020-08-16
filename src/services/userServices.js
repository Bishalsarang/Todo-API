const pool = require('../db');

const createUser = async ({ name, email, password }) => {
  const sqlQuery = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3)';
  const values = [name, email, password];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    return null;
  }
};

module.exports = { createUser };
