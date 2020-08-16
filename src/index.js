const express = require('express');
const app = express();

const morgan = require('morgan');
const routes = require('./routes');

const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');

require('./config');

app.set('host', process.env.APP_HOST);
app.set('port', process.env.APP_PORT);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

app.get('/', (req, res) => res.json({ success: 'okay', msg: 'Hello API' }));

app.use(errorHandler.genericErrorHandler);
// app.use(errorHandler.methodNotAllowed);
app.use(errorHandler.notFound);

app.listen(app.get('port'), app.get('host'), () =>
  logger.info(`Server running on http://${app.get('host')}:${app.get('port')}`),
);
