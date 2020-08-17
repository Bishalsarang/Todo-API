const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');
const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');

require('./config');

app.set('host', process.env.APP_HOST);
app.set('port', process.env.APP_PORT);

// Middleware
// app.options('*', cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ success: true, msg: 'Hello API' });
});

app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);

app.listen(app.get('port'), app.get('host'), (err) => {
  if (err) {
    logger.error('Unable to start server', err.trace);
  } else {
    logger.info(`Server running on http://${app.get('host')}:${app.get('port')}`);
  }
});
