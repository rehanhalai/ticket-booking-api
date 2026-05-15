const { Sequelize, DataTypes } = require('sequelize');
const {sequelizeDB} = require("../config/db");

const SeatType = sequelizeDB.define('SeatType',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    seatName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ticketPrice:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    seatStartedAt:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seatEndingAt:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    softDelete:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = SeatType;