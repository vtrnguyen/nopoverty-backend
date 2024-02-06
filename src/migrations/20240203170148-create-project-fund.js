'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProjectFunds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectFundID: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      donateDate: {
        type: Sequelize.DATE
      },
      projectID: {
        type: Sequelize.STRING
      },
      userID: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProjectFunds');
  }
};