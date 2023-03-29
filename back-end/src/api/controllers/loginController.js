const service = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await service.login(email, password);
  if (!token) {
    res.sendStatus(404);
  }
  res.status(200).send({ token });
};

module.exports = { login };