'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4,2),
      },
      urlImage:{
        allowNull: false,
        type: Sequelize.STRING(200),
        field: 'url_image',
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
