const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeDB } = require("../config/db");

const discountSettings = sequelizeDB.define("discountSettings", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    metadata: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = discountSettings;
