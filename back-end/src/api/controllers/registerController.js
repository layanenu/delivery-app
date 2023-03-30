const service = require('../services/registerService');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const token = await service.register(name, email, password);
  if (!token) {
    res.sendStatus(409);
  }

  res.status(201).send({ token });
};

module.exports = { register };
