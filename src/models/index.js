const UserBookingModel = require("./userBooking");
const SeatTypeModel = require("./seatType");
const {sequelizeDB} = require("../../config/db");


const runasync = async () => {
    try{
    await sequelizeDB.sync();
        console.log("The table for the UserBooking model was created!");
        console.log("The table for the SeatType model was created!");

    }catch(error){
        console.error("Unable to connect or sync:", error);
    }
};
module.exports = {runasync}