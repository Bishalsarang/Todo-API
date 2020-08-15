const express = require('express');
const app = express();

const morgan = require('morgan');

const logger = require('./utils/logger');

require('./config');

const db = require('./db');

app.set('host', process.env.APP_HOST);
app.set('port', process.env.APP_PORT);

// Middleware
app.use(morgan('dev'));

db.connect()
  .then((client) => {
    client
      .query('CREATE TABLE IF NOT EXISTS hawa(role_id serial PRIMARY KEY, role_name VARCHAR (255) UNIQUE NOT NULL)')
      .then(() => {
        logger.info('Table created success ');
      })
      .catch((err) => {
        logger.error(err);
      });
  })
  .catch((err) => {
    logger.error(err);
  });

app.get('/', (req, res) => res.send('Hello API'));

app.listen(app.get('port'), app.get('host'), () => logger.info(`Example app listening on port port!`));
