'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      attendance: {
        type: Sequelize.INTEGER
      },
      ip1: {
        type: Sequelize.INTEGER
      },
      ip2: {
        type: Sequelize.INTEGER
      },
      ip3: {
        type: Sequelize.INTEGER
      },
      ip4: {
        type: Sequelize.INTEGER
      },
      recom1: {
        type: Sequelize.BOOLEAN
      },
      recom2: {
        type: Sequelize.BOOLEAN
      },
      reason1: {
        type: Sequelize.STRING
      },
      reason2: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};