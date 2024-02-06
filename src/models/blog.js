'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      // define n-1 relationship with table Image
      Blog.hasMany(models.Image, {
        foreignKey: 'blogID',
      }) 
      
      // define n-1 relationship with table Video
      Blog.hasMany(models.Video, {
        foreignKey: 'blogID',
      })  

      // define n-n relationship with table User throught table Like
      Blog.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'blogID',
      });

      // define n-n relationship with table User throught table Comment
      Blog.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'blogID',
      });

      // reference to table User
      Blog.belongsTo(models.User, {
        foreignKey: 'userID',
      });

      // reference to table Category
      Blog.belongsTo(models.Category, {
        foreignKey: 'categortID',
      });
    }
  };
  Blog.init({
    blogID: DataTypes.STRING,
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    content: DataTypes.STRING,
    avatar: DataTypes.STRING,
    viewCount: DataTypes.INTEGER,
    likeCount: DataTypes.INTEGER,
    commentCount: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    isHome: DataTypes.BOOLEAN,
    categoryID: DataTypes.STRING,
    userID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};