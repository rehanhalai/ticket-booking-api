const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeDB } = require("../config/db");

const discountSettings = sequelizeDB.define("discountSettings", {
  key: { type: DataTypes.INTEGER, allowNull: false },
  value: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = discountSettings;
