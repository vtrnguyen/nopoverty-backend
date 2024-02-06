'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // Define foreign key to reference to table User
      Account.belongsTo(models.User, {
        foreignKey: 'userID',
        onDelete: 'CASCADE'
      });
    }
  };
  Account.init({
    userID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};