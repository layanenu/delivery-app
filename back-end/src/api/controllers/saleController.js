const service = require('../services/salesService');

const create = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: res.locals.userId };
    const response = await service.create(data);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  } 
};

const getSalesByCustomer = async (req, res) => {
  const userId = Number(req.params.id);
  const response = await service.getSalesByCustomer(userId);
  return res.status(200).json(response);
};

const getSalesBySeller = async (req, res) => {
  const sellerId = Number(req.params.id);
  const response = await service.getSalesByCustomer(sellerId);
  return res.status(200).json(response);
};

const getSalesWithDetails = async (req, res) => {
  const { id } = req.params;
  const sale = await service.getSalesWithDetails(Number(id));
  return res.status(200).json(sale);
};

module.exports = { create, getSalesByCustomer, getSalesBySeller, getSalesWithDetails };
