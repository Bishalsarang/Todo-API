const bcrypt = require('bcrypt');
const httpStatus = require('http-status-codes');
const { validationResult } = require('express-validator');

const userServices = require('../services/userServices');

const {
  verifyToken,
  sendRefreshToken,
  clearRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/auth.utils');

const register = async (req, res, next) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const { name, email, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.errors));
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await userServices.createUser({
      name,
      email,
      password: hashedPassword,
    });

    if (result.severity === 'ERROR') {
      throw new Error(result.detail);
    }

    res
      .status(httpStatus.CREATED)
      .json({ success: true, message: 'Account created successfully', data: { name, email } });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error(JSON.stringify(errors.errors));
    }

    const isEmailExist = await userServices.isEmailExist(email);

    if (isEmailExist.severity === 'Error' || !isEmailExist) {
      throw new Error("Email  doesn't exist");
    }

    const hashedPassword = await userServices.getHashedPassword(email);

    if (hashedPassword.severity === 'Error' || !hashedPassword) {
      throw new Error("Email  or password doesn't match");
    }
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new Error("Email or password doesn't match");
    }

    const token = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

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
