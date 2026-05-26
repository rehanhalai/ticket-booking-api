const userModel = require("../models/user.model");
const roleModel = require("../models/role.model")
const permissionModel = require("../models/permission.model")

const UserRepository = {
    getAllUsers: async () => {
        return await userModel.findAll();
    },
    getUserById: async (id) => {
        return await userModel.findOne({ where: { id, softDelete: false } });
    },
    getUserByEmail: async (email) => {
        return await userModel.findOne({ where: { email, softDelete: false }});
    },
    createUser: async (userData) => {
        return await userModel.create(userData);
    },
    updateUser: async (id, userData) => {
        return await userModel.update(userData, {
            where: {
                id,
            },
        });
    },
    deleteUser: async (id) => {
        return await userModel.destroy({
            where: {
                id,
            },
        });
    },
    hasPermission : async ( roleId, permissionName) => {
        const count = await roleModel.count({
            where: {
                id: roleId,
            },
            include: {
                model: permissionModel,
                where: {
                    name : permissionName,
                    softDelete: false
                },
                through: {
                    attributes: []
                }
            }
        })
        return count > 0;
    }
};

module.exports = UserRepository;
