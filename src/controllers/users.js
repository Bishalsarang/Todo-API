const bcrypt = require('bcrypt');

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

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
