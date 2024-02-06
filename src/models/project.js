'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsToMany(models.User, {
        through: models.ProjectFund,
        foreignKey: 'projectID',
      });

      Project.belongsToMany(models.User, {
        through: models.Participation,
        foreignKey: 'projectID',
      });
    }
  };
  Project.init({
    projectID: DataTypes.STRING,
    title: DataTypes.STRING,
    alias: DataTypes.STRING,
    description: DataTypes.STRING,
    avatar: DataTypes.STRING,
    viewCount: DataTypes.INTEGER,
    joinCount: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    totalFund: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};