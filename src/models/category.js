'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
    }
  };
  Category.init({
    categoryID: DataTypes.STRING,
    title: DataTypes.STRING,
    position: DataTypes.STRING,
    alias: DataTypes.STRING,
    link: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};