const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !regex.test(email)) {
    return res.sendStatus(401);
  }
  if (!password || password.length < 6) {
    return res.sendStatus(401);
  }
  next();
};

module.exports = { validateLogin };