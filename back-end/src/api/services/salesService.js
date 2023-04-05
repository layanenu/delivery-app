const { Sale, User, SaleProduct, Product, sequelize } = require('../../database/models');

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

const mapSales = (rawSale) => ({
    id: rawSale.id,
    sellerName: rawSale.seller.name,
    saleDate: new Date(rawSale.saleDate).toLocaleDateString('PT-BR'),
    status: rawSale.status,
    products: rawSale.products.map((product) => ({ 
        name: product.name, 
        price: product.price, 
        quantity: product.SaleProduct.quantity,
        subTotal: Number(product.price) * product.SaleProduct.quantity, 
      })),
  });

const getSalesWithDetails = async (saleId) => {
 const rawSale = await Sale.findOne({ 
    where: { id: saleId },
    include: [
      { model: User, as: 'seller', attributes: ['name'] },
      { model: Product, as: 'products', attributes: ['name', 'price'] },
    ],
  }); 

  const sale = mapSales(rawSale);

  return sale;
};

const updateStatus = async (newStatus, saleId) => {
  await Sale.update(
    { status: newStatus },
    { where: { id: saleId } },
    );
};

module.exports = { 
  create, 
  getSalesByCustomer, 
  getSalesBySeller, 
  getSalesWithDetails,
  updateStatus, 
};
