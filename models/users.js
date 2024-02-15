'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.incomes);
      users.hasMany(models.outcomes);
      users.hasMany(models.transfers);
      users.hasMany(models.reports);
    }
  }
  users.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    pin: DataTypes.INTEGER,
    otp: DataTypes.STRING,
    isActivated: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};