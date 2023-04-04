const Product = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    urlImage: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  },
  {
    tableName: 'products',
    timestamps: false,
    underscored: true,
  });

  return product;
}

module.exports = Product;