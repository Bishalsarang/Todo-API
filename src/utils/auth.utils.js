const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  // Access Token Expires in 15 mins
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });
};

const generateRefreshToken = (payload) => {
  // Refresh Token expires in 7days
  return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });
};

const verifyToken = async (token, SECRET = process.env.SECRET_KEY) => {
  const result = await jwt.verify(token, SECRET);

  return result;
};

// Send Refresh Token to client
const sendRefreshToken = (res, token) => {
  res.cookie('refreshtoken', token, {
    httpOnly: true,
    path: './refreshToken',
  });
};

const clearRefreshToken = (res) => {
  res.clearCookie('refreshtoken');
};

module.exports = { generateAccessToken, clearRefreshToken, sendRefreshToken, generateRefreshToken, verifyToken };
