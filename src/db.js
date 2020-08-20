const { Pool } = require('pg');

require('./config');

const dbConfig = {
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};

const pool = new Pool(dbConfig);

module.exports = pool;
