const service = require('../services/loginService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await service.login(email, password);
  if (!response) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).send(response);
};

module.exports = { login };
