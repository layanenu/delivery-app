const service = require('../services/userService');

const getSellers = async (_req, res) => {
  const response = await service.getSellers();
  if (!response) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).send(response);
};

module.exports = { getSellers };
