const isAuthorized = (req, res, next) => {
  try {
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { isAuthorized };
