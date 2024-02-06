'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      // reference to table Blog
      Image.belongsTo(models.Blog, {
        foreignKey: 'blogID',
      });
    }
  };
  Image.init({
    imageID: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN,
    imagePath: DataTypes.STRING,
    blogID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};