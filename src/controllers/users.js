const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status-codes');

const userServices = require('../services/userServices');

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
      throw new Error("Email or password doesn't match");
    }

    const hashedPassword = await userServices.getHashedPassword(email);

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new Error("Email or password doesn't match");
    }

    const token = jwt.sign({ name, email }, process.env.SECRET_KEY);

    res.json({ success: true, message: `Successfully logged in`, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
