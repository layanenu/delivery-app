const service = require('../services/registerService');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const response = await service.register(name, email, password, role);
  if (!response) {
    return res.status(409).json({ message: 'Conflict' });
  }

  res.status(201).send(response);
};

module.exports = { register };
