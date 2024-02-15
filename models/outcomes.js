'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outcomes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      outcomes.belongsTo(models.users, {
        foreignKey: 'userId'
      });

      outcomes.hasMany(models.reports);
    }
  }
  outcomes.init({
    userId: DataTypes.INTEGER,
    amountOutcome: DataTypes.INTEGER,
    description: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'outcomes',
  });
  return outcomes;
};