const BookingModel = require("./booking.model");
const SeatTypeModel = require("./seatType.model");
const UserModel = require("./user.model");
const roleModel = require("./role.model");
const discountSettingModel = require("./discountSettings.model");

const { sequelizeDB } = require("../config/db");

const runasync = async () => {
  try {
    await sequelizeDB.sync();
    console.log("The tables are created!");
  } catch (error) {
    console.error("Unable to connect or sync:", error);
  }
};
module.exports = { runasync };
