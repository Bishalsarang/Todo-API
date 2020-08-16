const HttpStatus = require('http-status-codes');

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
  //   console.log('here');
  res.status(404).json({ err });
};

module.exports = { notFound, methodNotAllowed, genericErrorHandler };
