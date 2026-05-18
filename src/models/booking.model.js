const { Sequelize, DataTypes } = require('sequelize');
const {sequelizeDB} = require("../config/db");

const UserBooking = sequelizeDB.define('Booking',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user : {
        type: DataTypes.INTEGER,
        references:{
            model : "Users",
            key: "id"
        }
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