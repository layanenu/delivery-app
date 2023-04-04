const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
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
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  }
  );

  user.associate = (models) => {
    user.hasMany(models.Sale, { 
      foreignKey: 'id', as: 'orders' 
    });

    user.hasMany(models.Sale, { 
      foreignKey: 'id', as: 'sales'
    });
  }

  return user;
}

module.exports = User;