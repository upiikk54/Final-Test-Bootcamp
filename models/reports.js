'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reports.belongsTo(models.users, {
        foreignKey: 'userId'
      });

      reports.belongsTo(models.incomes, {
        foreignKey: 'incomeId'
      });

      reports.belongsTo(models.outcomes, {
        foreignKey: 'outcomeId'
      });

      reports.belongsTo(models.transfers, {
        foreignKey: 'transferId'
      });
    }
  }
  reports.init({
    userId: DataTypes.INTEGER,
    incomeId: DataTypes.INTEGER,
    outcomeId: DataTypes.INTEGER,
    transferId: DataTypes.INTEGER,
    reportDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'reports',
  });
  return reports;
};