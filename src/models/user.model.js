const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeDB } = require("../config/db");

const User = sequelizeDB.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
    },
    softDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = User;
