const { Sequelize, DataTypes } = require("sequelize");
const { sequelizeDB } = require("../config/db");

const UserBooking = sequelizeDB.define("booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id",
        },
    },
    seatNo: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
    },
    seatType: {
        type: DataTypes.INTEGER,
        references: {
            model: "seatTypes",
            key: "id",
        },
    },
    ticketPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    softDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = UserBooking;
