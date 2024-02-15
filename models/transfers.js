'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transfers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transfers.belongsTo(models.users, {
        foreignKey: 'userId'
      });

      transfers.belongsTo(models.users, {
        foreignKey: 'receiverId'
      });

      transfers.hasMany(models.reports);
    }
  }
  transfers.init({
    userId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    amountTransfer: DataTypes.INTEGER,
    transferDate: DataTypes.DATE,
    descriptionTransfer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transfers',
  });
  return transfers;
};