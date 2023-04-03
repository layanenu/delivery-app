const { Sale, SaleProduct } = require('../../database/models');

const create = async (data) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber, userId, products } = data;
  const newTotalPrice = Number(totalPrice.replace(',', '.'));
  const sale = await Sale.create({
    sellerId,
    totalPrice: newTotalPrice,
    deliveryAddress,
    userId,
    deliveryNumber,
    saleDate: new Date(),
  });
  const newProducts = products.map((product) => {
    const { quantity, id } = product;
    return { sale_id: sale.id, product_id: id, quantity };
  });
  console.log(newProducts);
  const saleProducts = await SaleProduct.bulkCreate(newProducts);
  return { sale, saleProducts };
};

module.exports = { create };
