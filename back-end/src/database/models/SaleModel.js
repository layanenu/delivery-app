const Sale = (sequelize, DataTypes) => {
  const sale = sequelize.define('Sale', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    sellerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    deliveryAddress:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    saleDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    status:{
      type: DataTypes.STRING,
      defaultValue: 'Pendente'
    }
  },
  {
    tableName: 'sales',
    timestamps: false,
    underscored: true,
  }
  );

  sale.associate = (models) => {
    sale.belongsTo(models.User, {
      foreignKey: 'userId', as: 'customer'
    });

    sale.belongsTo(models.User, {
      foreignKey: 'sellerId', as: 'seller'
    });
  }

  return sale;
}

module.exports = Sale;