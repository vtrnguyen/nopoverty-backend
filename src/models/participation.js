'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participation extends Model {
    static associate(models) {
      Participation.belongsTo(models.User, {
        foreignKey: 'userID',
      });

      Participation.belongsTo(models.Project, {
        foreignKey: 'projectID',
      });
    }
  };
  Participation.init({
    projectID: DataTypes.STRING,
    userID: DataTypes.STRING,
    projectRole: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Participation',
  });
  return Participation;
};