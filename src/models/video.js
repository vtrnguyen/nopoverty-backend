'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(models) {
      // reference to table Blog
      Video.belongsTo(models.Blog, {
        foreignKey: 'blogID',
      });
    }
  };
  Video.init({
    videoID: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN,
    videoPath: DataTypes.STRING,
    blogID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};