const BookingModel = require("./booking.model");
const SeatTypeModel = require("./seatType.model");
const UserModel = require("./user.model");
const roleModel = require("./role.model");
const discountSettingModel = require("./discountSettings.model");
const permissionModel = require("./permission.model");

const { sequelizeDB } = require("../config/db");


roleModel.belongsToMany(permissionModel, { through: "rolePermissions", onDelete: "CASCADE" });
permissionModel.belongsToMany(roleModel, { through: "rolePermissions", onDelete: "CASCADE" });

UserModel.belongsTo(roleModel, { foreignKey: "roleId" });
roleModel.hasMany(UserModel, { foreignKey: "roleId" });

const runasync = async () => {
    try {
        await sequelizeDB.sync({ force:true });
        console.log("The tables are created!");
    } catch (error) {
        console.error("Unable to connect or sync:", error);
    }
};
module.exports = { runasync };
