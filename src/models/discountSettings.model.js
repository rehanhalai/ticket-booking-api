const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeDB } = require("../config/db");

const discountSettings = sequelizeDB.define("discountSettings", {
    key: { type: DataTypes.INTEGER, allowNull: false },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 100,
        },
    },
});

module.exports = discountSettings;
