const jwt = require('jsonwebtoken');
const { HttpError } = require('http-errors');
const httpStatusCodes = require('http-status-codes');

const isAuthenticated = async (req, res, next) => {
  const token =
    req.headers['auth-token'] || req.headers['authorization'] || req.headers['token'] || req.headers['x-access-token'];

  try {
    if (token) {
      const isValidToken = await jwt.verify(token, process.env.SECRET_KEY);

      if (!isValidToken) {
        throw new HttpError(httpStatusCodes.UNAUTHORIZED, 'Not authorized. Try to login again ');
      }
      next();
    } else {
      throw new HttpError(httpStatusCodes.UNAUTHORIZED, 'Not authorized. Try to login again ');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isAuthenticated };
