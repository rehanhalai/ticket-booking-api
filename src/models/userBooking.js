const { Sequelize, DataTypes } = require('sequelize');
const {sequelizeDB} = require("../../config/db");

const UserBooking = sequelizeDB.define('UserBooking',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    seatNo :{ 
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull : false,
    },
    seatType : {
        type: DataTypes.INTEGER,
        references:{
            model : "SeatTypes",
            key: "id"
        }
    },
    ticketPrice:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    softDelete:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = UserBooking;