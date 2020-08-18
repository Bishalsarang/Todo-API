const pool = require('../db');

const emptyUsers = async () => {
  const sqlQuery = 'DELETE from users';

  try {
    await pool.query(sqlQuery);
  } catch (err) {
    console.error(err);

    return null;
  }
};

const createUser = async ({ name, email, password }) => {
  const sqlQuery = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3)';
  const values = [name, email, password];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    return null;
  }
};

const setRefreshToken = async (refreshToken, email) => {
  const sqlQuery = 'UPDATE users SET refreshToken=$1 WHERE email=$2';
  const values = [refreshToken, email];

  try {
    return await pool.query(sqlQuery, values);
  } catch (err) {
    return null;
  }
};

const getHashedPassword = async (email) => {
  const sqlQuery = 'SELECT password FROM users WHERE email=$1';
  const values = [email];

  try {
    const result = await pool.query(sqlQuery, values);

    return result.rows[0].password;
  } catch (err) {
    return null;
  }
};

const isEmailExist = async (email) => {
  const sqlQuery = 'SELECT COUNT(*) FROM users WHERE email=$1';
  const values = [email];

  try {
    const result = await pool.query(sqlQuery, values);

    return parseInt(result.rows[0].count) === 1;
  } catch (err) {
    return null;
  }
};

module.exports = { createUser, getHashedPassword, isEmailExist, setRefreshToken, emptyUsers };
