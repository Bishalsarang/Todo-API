const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  const token =
    req.headers['auth-token'] || req.headers['authorization'] || req.headers['token'] || req.headers['x-access-token'];

  try {
    if (token) {
      const isValidToken = await jwt.verify(token, process.env.SECRET_KEY);

      if (!isValidToken) {
        throw new Error('Invalid access token');
      }
      next();
    } else {
      throw new Error('No token available');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isAuthenticated };
