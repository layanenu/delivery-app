const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length < 12) {
    return res.status(404).json({ message: 'Not found' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(404).json({ message: 'Not found' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !regex.test(email)) {
    return res.status(404).json({ message: 'Not found' });
  }
  next();
};

module.exports = { validateName, validatePassword, validateEmail };
