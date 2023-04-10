const service = require('../services/userService');

const getSellers = async (_req, res) => {
  const response = await service.getSellers();
  return res.status(200).send(response);
};

const getUsers = async (_req, res) => {
  const response = await service.getUsers();
  return res.status(200).send(response);
};

const getUsersByAdmin = async (_req, res) => {
  const response = await service.getUsersByAdmin();
  return res.status(200).send(response);
};

const remove = async (req, res, next) => {
  try {
    console.log(req);
    const { email } = req.body;
    await service.remove(email);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSellers, getUsers, remove, getUsersByAdmin };
