const bcrypt = require('bcrypt');

const httpStatus = require('http-status-codes');

const userServices = require('../services/userServices');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  verifyToken,
  clearRefreshToken,
} = require('../utils/auth.utils');

const register = async (req, res, next) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await userServices.createUser({
      name,
      email,
      password: hashedPassword,
    });

    //  If user account can't be created
    if (!result) {
      throw new Error('Unable to create new account');
    }

    res
      .status(httpStatus.CREATED)
      .json({ success: true, message: 'Account created successfully', data: { name, email } });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const isEmailExist = await userServices.isEmailExist(email);

    if (!isEmailExist) {
      throw new Error("Email  doesn't exist");
    }

    const hashedPassword = await userServices.getHashedPassword(email);

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new Error("Email or password doesn't match");
    }

    const token = generateAccessToken({ name, email });
    const refreshToken = generateRefreshToken({ name, email });

    sendRefreshToken(res, refreshToken);
    if (!userServices.setRefreshToken(refreshToken, email)) {
      throw new Error('Unable to set refresh token');
    }

    res.json({ success: true, message: `Successfully logged in`, token });
  } catch (err) {
    next(err);
  }
};

const logOut = (req, res, next) => {
  try {
    clearRefreshToken(res);
    res.json({
      success: true,
      message: 'Successfully logged out',
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  if (!req.headers) {
    throw new Error('No headers');
  }

  if (!req.headers.cookie) {
    throw new Error('NO cookie in header');
  }

  const token = req.headers.cookie.split('=')[1];

  let payload = null;

  try {
    if (!token) {
      throw new Error('No valid refresh tokens');
    }
    payload = await verifyToken(token, process.env.REFRESH_SECRET_KEY);

    res.json({ message: 'refresh', data: payload });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logOut, refreshToken };
