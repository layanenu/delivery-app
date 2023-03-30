const service = require('../services/productService');

const getAll = async (req, res) => {
  const allProducts = await service.getAll();
  return res.status(200).send(allProducts);
};

module.exports = { getAll };