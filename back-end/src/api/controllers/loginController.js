const service = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await service.login(email, password);
  res.status(200).send({ token });
};

module.exports = { login };