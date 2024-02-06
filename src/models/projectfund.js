'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectFund extends Model {
    static associate(models) {
      // reference to table User
      ProjectFund.belongsTo(models.User, {
        foreignKey: 'userID',
      });

      // reference to table Project
      ProjectFund.belongsTo(models.Project, {
        foreignKey: 'projectID',
      })
    }
  };
  ProjectFund.init({
    projectFundID: DataTypes.STRING,
    amount: DataTypes.STRING,
    donateDate: DataTypes.DATE,
    projectID: DataTypes.STRING,
    userID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectFund',
  });
  return ProjectFund;
};