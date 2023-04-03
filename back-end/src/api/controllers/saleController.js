const service = require('../services/salesService');

const create = async (req, res) => {
  const data = req.body;
  const response = await service.create(data);
  return res.status(201).json(response);
};

module.exports = { create };
