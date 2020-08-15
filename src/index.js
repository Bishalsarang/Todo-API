const express = require('express');
const app = express();

const morgan = require('morgan');
const routes = require('./routes');

const logger = require('./utils/logger');

require('./config');

app.set('host', process.env.APP_HOST);
app.set('port', process.env.APP_PORT);

// Middleware
app.use(morgan('dev'));

// API Routes
app.use('/api', routes);

// pool
//   .connect()
//   .then((client) => {
//     client
//       .query('CREATE TABLE IF NOT EXISTS test(role_id serial PRIMARY KEY, role_name VARCHAR (255) UNIQUE NOT NULL)')
//       .then(() => {
//         logger.info('Table created success ');
//       })
//       .catch((err) => {
//         logger.error(err);
//       });
//   })
//   .catch((err) => {
//     logger.error('TTTT' + err);
//   });

app.get('/', (req, res) => res.send('Hello API'));

app.listen(app.get('port'), app.get('host'), () => logger.info(`Example app listening on port port!`));
