const pool = require('../db');
const logger = require('../utils/logger');

const fetchAll = async (req, resp) => {
  try {
    const res = await pool.query('SELECT NOW()');

    logger.log(res);
  } catch (err) {
    logger.error(err);
  }

  resp.end('hi');
};

module.exports = { fetchAll };
