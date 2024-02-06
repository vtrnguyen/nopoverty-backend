'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // reference to table User
      Comment.belongsTo(models.User, {
        foreignKey: 'userID',
      });

      // reference to table Blog
      Comment.belongsTo(models.Blog, {
        foreignKey: 'blogID',
      });
    }
  };
  Comment.init({
    commentID: DataTypes.STRING,
    actionType: DataTypes.STRING,
    actionDate: DataTypes.DATE,
    blogID: DataTypes.STRING,
    userID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};