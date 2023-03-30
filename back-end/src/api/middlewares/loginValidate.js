const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !regex.test(email)) {
    return res.status(404).json({ message: 'Not found' });
  }
  if (!password || password.length < 6) {
    return res.status(404).json({ message: 'Not found' });
  }
  next();
};

module.exports = { validateLogin };