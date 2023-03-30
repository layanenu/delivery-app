const service = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await service.login(email, password);
  if (!response) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).send(response);
};

const loginVerify = async (req, res) => {
  const { token } = req.body;
  const user = await service.loginVerify(token);
  if (!user) {
    return res.status(401).json(false);
  }
  return res.status(200).json(true);
};

module.exports = { login, loginVerify };
