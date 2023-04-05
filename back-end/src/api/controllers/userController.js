const service = require('../services/userService');

const getSellers = async (_req, res) => {
  const response = await service.getSellers();
  return res.status(200).send(response);
};

const getUsers = async (_req, res) => {
  const response = await service.getUsers();
  return res.status(200).send(response);
};

module.exports = { getSellers, getUsers };
