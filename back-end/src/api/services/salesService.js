const { Sale, SaleProduct, sequelize } = require('../../database/models');

// const create = async (data) => {
//   const { sellerId, totalPrice, deliveryAddress, deliveryNumber, userId, products } = data;
//   const newTotalPrice = Number(totalPrice.replace(',', '.'));
//   const sale = await Sale.create({
//     sellerId,
//     totalPrice: newTotalPrice,
//     deliveryAddress,
//     userId,
//     deliveryNumber,
//     saleDate: new Date(),
//   });
//   const newProducts = products.map((product) => {
//     const { quantity, id } = product;
//     return { sale_id: sale.id, product_id: id, quantity };
//   });
//   console.log(newProducts);
//   const saleProducts = await SaleProduct.bulkCreate(newProducts);
//   return { sale, saleProducts };
// // };
const fixPrice = (price) => Number(price.replace(',', '.'));

const create = async (sale) => {
  const result = await sequelize.transaction(async (t) => {
    const newSale = await Sale.create(
            { sellerId: sale.sellerId, 
              totalPrice: fixPrice(sale.totalPrice),
              deliveryAddress: sale.deliveryAddress,
              deliveryNumber: sale.deliveryNumber,
              userId: sale.userId,
              saleDate: new Date() }, 
            { transaction: t },
);
    await Promise.all(sale.products.map(({ quantity, id }) => 
          SaleProduct.create(
            { saleId: newSale.dataValues.id, productId: id, quantity }, 
            { transaction: t },
)));
    return newSale;
  });
  return result;
};

const getSalesByCustomer = async (userId) => {
  const result = await Sale.findAll({ where: { userId } });
  return result;
};

const getSalesBySeller = async (sellerId) => {
  const result = await Sale.findAll({ where: { sellerId } });
  return result;
};

module.exports = { create, getSalesByCustomer, getSalesBySeller };
