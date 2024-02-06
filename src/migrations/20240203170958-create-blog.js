'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blogID: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      alias: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      viewCount: {
        type: Sequelize.INTEGER
      },
      likeCount: {
        type: Sequelize.INTEGER
      },
      commentCount: {
        type: Sequelize.INTEGER
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      isHome: {
        type: Sequelize.BOOLEAN
      },
      categoryID: {
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
    await queryInterface.dropTable('Blogs');
  }
};