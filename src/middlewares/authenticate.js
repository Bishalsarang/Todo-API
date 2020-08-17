const httpStatusCodes = require('http-status-codes');

const { verifyToken } = require('../utils/auth.utils');

const isAuthenticated = async (req, res, next) => {
  const token =
    req.headers['auth-token'] || req.headers['authorization'] || req.headers['token'] || req.headers['x-access-token'];

  try {
    if (token) {
      const isValidToken = await verifyToken(token);

      if (!isValidToken) {
        const err = new Error('Not authorized. Try to login again ');

        err.statusCode = httpStatusCodes.UNAUTHORIZED;
        throw err;
      }
      next();
    } else {
      const err = new Error('Not authorized. Try to login again ');

      err.statusCode = httpStatusCodes.UNAUTHORIZED;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isAuthenticated };
