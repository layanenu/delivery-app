const SaleProduct = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define('SaleProduct',
  {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'sales',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'sales_products',
    timestamps: false,
    underscored: true,
  });
  
  saleProduct.associate = (models) => {
    
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: saleProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });

    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: saleProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  }

  return saleProduct;
}

module.exports = SaleProduct;