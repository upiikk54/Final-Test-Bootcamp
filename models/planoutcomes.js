'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class planOutcomes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      planOutcomes.belongsTo(models.users, {
        foreignKey: 'userId'
      });
    }
  }
  planOutcomes.init({
    userId: DataTypes.INTEGER,
    namePlan: DataTypes.STRING,
    amountPlan: DataTypes.INTEGER,
    datePlan: DataTypes.DATE,
    description: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'planOutcomes',
  });
  return planOutcomes;
};