'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // reference to table User
      Like.belongsTo(models.User, {
        foreignKey: 'userID',
      });

      // reference to table Blog
      Like.belongsTo(models.Blog, {
        foreignKey: 'blogID',
      });
    }
  };
  Like.init({
    likeID: DataTypes.STRING,
    actionType: DataTypes.STRING,
    actionDate: DataTypes.DATE,
    blogID: DataTypes.STRING,
    userID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};