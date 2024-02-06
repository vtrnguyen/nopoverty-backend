'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // reference to table Category
      Post.belongsTo(models.Category, {
        foreignKey: 'categoryID',
      });
    }
  };
  Post.init({
    postID: DataTypes.STRING,
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.STRING,
    detail: DataTypes.STRING,
    image: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    categoryID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};