const HttpStatus = require('http-status-codes');

const logger = require('../utils/logger');

const notFound = (req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    },
  });
};

const methodNotAllowed = (req, res) => {
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
    error: {
      code: HttpStatus.METHOD_NOT_ALLOWED,
      message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
    },
  });
};

const genericErrorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (!err.statusCode) {
    err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    err.message = err.message || HttpStatus.getStatusText(err.statusCode);
  }
  res.status(err.statusCode).json({ success: false, message: err.message });
};

module.exports = { notFound, methodNotAllowed, genericErrorHandler };
