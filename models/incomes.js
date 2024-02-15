'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class incomes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      incomes.belongsTo(models.users, {
        foreignKey: 'userId'
      });

      incomes.hasMany(models.reports);
    }
  }
  incomes.init({
    userId: DataTypes.INTEGER,
    amountIncome: DataTypes.INTEGER,
    description: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'incomes',
  });
  return incomes;
};