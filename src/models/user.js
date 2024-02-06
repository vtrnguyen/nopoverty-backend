'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define n-n relationship with table Project throught table ProjectFund
      User.belongsToMany(models.Project, {
        through: models.ProjectFund,
        foreignKey: 'userID',
      });
      
      // define n-n relationship with table Project throught table Participation
      User.belongsToMany(models.Project, {
        through: models.Participation,
        foreignKey: 'userID',
      });

      // define n-n relationship with table Blog throught table Like
      User.belongsToMany(models.Blog, {
        through: models.Like,
        foreignKey: 'userID',
      });

      // define n-n relationship with table Blog throught table Comment
      User.belongsToMany(models.Blog, {
        through: models.Comment,
        foreignKey: 'userID',
      });

      // Define table Account's foreign key to reference to table User
      User.hasOne(models.Account, {
        foreignKey: 'userID',
      })
    }
  };
  User.init({
    userID: DataTypes.STRING,
    fullName: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    typeRole: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};