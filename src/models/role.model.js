const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeDB } = require("../config/db");

const Roles = sequelizeDB.define("role", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    softDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Roles;
