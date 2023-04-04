const service = require('../services/salesService');

const create = async (req, res) => {
  const data = req.body;
  const response = await service.create(data);
  return res.status(201).json(response);
};

const getSalesByCustomer = async (req, res) => {
  const userId = Number(req.params.userid);
  const response = await service.getSalesByCustomer(userId);
  return res.status(200).json(response);
};

module.exports = { create, getSalesByCustomer };
